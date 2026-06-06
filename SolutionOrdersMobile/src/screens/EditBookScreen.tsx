import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import apiService from '../api/apiService';
import { Book, Author, Publisher, BookCategory } from '../types/models';

type Props = {
  bookId: number;
  onBack?: () => void;
  onBookUpdated?: () => void;
};

const EditBookScreen = ({ bookId, onBack, onBookUpdated }: Props) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [pages, setPages] = useState('');
  const [language, setLanguage] = useState('');
  const [idAuthor, setIdAuthor] = useState('');
  const [idPublisher, setIdPublisher] = useState('');
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  const [authors, setAuthors] = useState<Author[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [categories, setCategories] = useState<BookCategory[]>([]);

  const [showAuthors, setShowAuthors] = useState(false);
  const [showPublishers, setShowPublishers] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    loadBook();
  }, []);

  const loadBook = async () => {
    try {
      const data = await apiService.getBook(bookId);
      setBook(data);
      setTitle(data.title);
      setDescription(data.description);
      setPrice(String(data.price));
      setPages(String(data.pages));
      setLanguage(data.language);
      setIdAuthor(String(data.idAuthor));
      setIdPublisher(String(data.idPublisher ?? ''));
      setSelectedCategoryIds(data.categoryIds ?? []);

      const authorsData = await apiService.getAuthors();
      const publishersData = await apiService.getPublishers();
      const categoriesData = await apiService.getBookCategories();

      setAuthors(authorsData);
      setPublishers(publishersData);
      setCategories(categoriesData);

    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się pobrać książki');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!book) {
      return;
    }

    if (!title || !description || !price || !pages || !language) {
      Alert.alert('Błąd', 'Uzupełnij wszystkie pola');
      return;
    }

    try {
      await apiService.updateBook(bookId, {
        idBook: bookId,
        title,
        description,
        price: Number(price),
        pages: Number(pages),
        language,
        idAuthor: Number(idAuthor),
        idPublisher: Number(idPublisher),
        idBookCategories: selectedCategoryIds,
        isActive: book.isActive,
      });

      Alert.alert('Sukces', 'Książka została zaktualizowana');
      onBookUpdated?.();
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się zaktualizować książki');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backText}>Wróć</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edytuj książkę</Text>
      </View>

      <ScrollView contentContainerStyle={styles.form}>
        <TextInput style={styles.input} placeholder="Tytuł" value={title} onChangeText={setTitle} />
        <TextInput style={styles.input} placeholder="Opis" value={description} onChangeText={setDescription} />
        <TextInput style={styles.input} placeholder="Cena" value={price} onChangeText={setPrice} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Liczba stron" value={pages} onChangeText={setPages} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Język" value={language} onChangeText={setLanguage} />
        <Text style={styles.label}>Autor</Text>

        <TouchableOpacity
          style={styles.dropdownHeader}
          onPress={() => setShowAuthors(!showAuthors)}
        >
          <Text>
            {authors.find(a => a.idAuthor === Number(idAuthor))
              ? `${authors.find(a => a.idAuthor === Number(idAuthor))?.firstName} ${authors.find(a => a.idAuthor === Number(idAuthor))?.lastName}`
              : 'Wybierz autora'}
          </Text>
          <Text>^</Text>
        </TouchableOpacity>

        {showAuthors && authors.map(author => (
          <TouchableOpacity
            key={author.idAuthor}
            style={styles.dropdownItem}
            onPress={() => {
              setIdAuthor(author.idAuthor.toString());
              setShowAuthors(false);
            }}
          >
            <Text>{author.firstName} {author.lastName}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.label}>Wydawca</Text>

        <TouchableOpacity
          style={styles.dropdownHeader}
          onPress={() => setShowPublishers(!showPublishers)}
        >
          <Text>
            {publishers.find(p => p.idPublisher === Number(idPublisher))?.name || 'Wybierz wydawcę'}
          </Text>
          <Text>^</Text>
        </TouchableOpacity>

        {showPublishers && publishers.map(publisher => (
          <TouchableOpacity
            key={publisher.idPublisher}
            style={styles.dropdownItem}
            onPress={() => {
              setIdPublisher(publisher.idPublisher.toString());
              setShowPublishers(false);
            }}
          >
            <Text>{publisher.name}</Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.label}>Kategoria</Text>
        {categories.map(category => {
          const isSelected = selectedCategoryIds.includes(category.idBookCategory);

          return (
            <TouchableOpacity
              key={category.idBookCategory}
              style={[
                styles.dropdownItem,
                isSelected && styles.selectedButton,
              ]}
              onPress={() => {
                if (isSelected) {
                  setSelectedCategoryIds(
                    selectedCategoryIds.filter(
                      id => id !== category.idBookCategory
                    )
                  );
                } else {
                  setSelectedCategoryIds([
                    ...selectedCategoryIds,
                    category.idBookCategory,
                  ]);
                }
              }}
            >
              <Text>
                {isSelected ? '+ ' : ''}
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Zapisz zmiany</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EditBookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#2563EB',
  },
  backText: {
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 12,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
  },
  form: {
    padding: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    color: '#0F172A',
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  label: {
  fontSize: 16,
  fontWeight: '700',
  marginBottom: 8,
  marginTop: 10,
  color: '#0F172A',
  },

  dropdownHeader: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  dropdownItem: {
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 6,
  },
  selectedButton: {
    backgroundColor: '#BFDBFE',
  },
});