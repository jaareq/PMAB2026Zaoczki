import React, { useEffect, useState } from 'react';
import apiService from '../api/apiService';
import { Book } from '../types/models';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';

type Props = {
  bookId?: number;
  onBack?: () => void;
};

const BookDetailsScreen = ({ bookId=1, onBack }: Props) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviewContent, setReviewContent] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    loadBook();
  }, []);

  const loadBook = async () => {
    try {
      const data = await apiService.getBook(bookId);
      setBook(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const addReview = async () => {
    if (!book) {
      return;
    }
    if (!reviewContent.trim()) {
      Alert.alert('Błąd', 'Wpisz treść recenzji');
      return;
    }
    try {
      await apiService.createReview({
        idBook: book.idBook,
        content: reviewContent,
        rating,
      });

      setReviewContent('');
      setRating(5);

      await loadBook();

      Alert.alert('Sukces', 'Dodano recenzję');
    } catch {
      Alert.alert('Błąd', 'Nie udało się dodać recenzji');
    }
  };
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Ładowanie...</Text>
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.container}>
        <Text>Nie znaleziono książki</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>

        <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Wróć</Text>
        </TouchableOpacity>

        {/* Góra ekranu - "Zdjęcie" książki */}
        <View style={styles.imageContainer}>
          <View style={styles.bookCover}>
            <Text style={styles.coverEmoji}>📖</Text>
            <Text style={styles.coverText}>
              {book.title.substring(0, 14).toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Informacje główne */}
        <View style={styles.content}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.author}>{book.authorName}</Text>

          {/* Statystyki: Ocena, Strony, Język */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Ocena</Text>
              <Text style={styles.statValue}>
                ⭐ {book.reviews && book.reviews.length > 0
                  ? (book.reviews.reduce((sum, r) => sum + r.rating, 0) / book.reviews.length).toFixed(1)
                  : '0.0'}
              </Text>
            </View>
            <View style={[styles.statItem, styles.statBorder]}>
              <Text style={styles.statLabel}>Strony</Text>
              <Text style={styles.statValue}>{book.pages}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Język</Text>
              <Text style={styles.statValue}>{book.language}</Text>
            </View>
          </View>

          {/* Opis */}
          <Text style={styles.descriptionTitle}>Opis książki</Text>
          <Text style={styles.descriptionTextSmall}>
            {book.description || 'Brak opisu'}
          </Text>
          <Text style={styles.descriptionTitle}>Wydawnictwo</Text>
          <Text style={styles.descriptionText}> {book.publisherName || 'Brak danych'} </Text>
          <Text style={styles.descriptionTitle}>Kategorie</Text>
          <Text style={styles.descriptionText}> {book.categories?.join(', ') || 'Brak kategorii'} </Text>
          <Text style={styles.descriptionTitle}> Dodaj recenzję </Text>
          <View style={{ flexDirection: 'row', marginBottom: 12 }}>
            {[1, 2, 3, 4, 5].map(value => (
              <TouchableOpacity
                key={value}
                onPress={() => setRating(value)}
                style={{
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                  }}
                >
                  {value <= rating ? '⭐' : '☆'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.inputReview}
            placeholder="Napisz opinię..."
            value={reviewContent}
            onChangeText={setReviewContent}
          />

          <TouchableOpacity
            style={styles.reviewButton}
            onPress={addReview}
          >
            <Text style={styles.reviewButtonText}>
              Dodaj recenzję
            </Text>
          </TouchableOpacity>
          <Text style={styles.descriptionTitle}>Recenzje</Text>
          {book.reviews && book.reviews.length > 0 ? (
            book.reviews.map((review) => (
              <View key={review.idReview} style={styles.reviewContainer}>
                <Text style={styles.reviewRating}>
                  ⭐ {review.rating}/5
                </Text>

                <Text style={styles.reviewText}>
                  {review.content}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.descriptionText}>Brak recenzji</Text>
          )}
        </View>
      </ScrollView>

      {/* Dolny panel z ceną i przyciskiem */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceLabel}>Cena</Text>
          <Text style={styles.priceValue}> {book.price.toFixed(2)} zł </Text>
        </View>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Kup teraz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    height: 350,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  bookCover: {
    width: 180,
    height: 260,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  coverEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  coverText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 2,
  },
  content: {
    padding: 24,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#FFFFFF',
    marginTop: -30,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
  author: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    padding: 16,
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#E2E8F0',
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#475569',
    marginBottom: 20, 
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  priceLabel: {
    fontSize: 14,
    color: '#94A3B8',
  },
  priceValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2563EB',
  },
  buyButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14,
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  backButton: {
  position: 'absolute',
  top: 50,
  left: 20,
  zIndex: 10,
  backgroundColor: '#FFFFFF',
  paddingHorizontal: 14,
  paddingVertical: 8,
  borderRadius: 20,
  },
  backButtonText: {
    color: '#2563EB',
    fontWeight: '700',
  },
  reviewContainer: {
  backgroundColor: '#F8FAFC',
  padding: 12,
  borderRadius: 12,
  marginBottom: 20,
  },

  reviewRating: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },

  reviewText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  descriptionTextSmall: {
    fontSize: 15,
    lineHeight: 24,
    color: '#475569',
    marginBottom: 20,
  },
  inputReview: {
  borderWidth: 1,
  borderColor: '#CBD5E1',
  borderRadius: 12,
  padding: 12,
  marginBottom: 12,
  },

  reviewButton: {
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },

  reviewButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});