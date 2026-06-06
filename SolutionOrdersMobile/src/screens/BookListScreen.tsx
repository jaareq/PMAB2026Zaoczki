import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import apiService from '../api/apiService';
import { Book } from '../types/models';
import BookCard from '../components/BookCard';
import { TouchableOpacity } from 'react-native';
import { AuthUser } from '../types/models';

type Props = {
  user?: AuthUser | null;
  onBookPress?: (idBook: number) => void;
  onAddPress?: () => void;
  onEditPress?: (idBook: number) => void;
  onBackToMenu?: () => void;
};

const BookListScreen = ({ user, onBookPress, onAddPress, onEditPress, onBackToMenu }: Props) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await apiService.getBooks();
      setBooks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <View
        style={{
          paddingTop: 60,
          paddingBottom: 20,
          paddingHorizontal: 20,
          backgroundColor: '#2563EB',
        }}
      >
        <TouchableOpacity onPress={onBackToMenu}>
          <Text style={{ color: '#FFFFFF', fontWeight: '700', marginBottom: 12 }}>
            Menu
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: 'white',
            fontSize: 28,
            fontWeight: '800',
          }}
        >
          Książki
        </Text>

        {user?.role === 'Admin' && (
          <TouchableOpacity
            style={{
              marginTop: 16,
              backgroundColor: '#FFFFFF',
              paddingVertical: 12,
              borderRadius: 14,
              alignItems: 'center',
            }}
            onPress={onAddPress}
          >
            <Text style={{ color: '#2563EB', fontWeight: '800' }}>
              + Dodaj książkę
            </Text>
          </TouchableOpacity>
        )}
      </View>          

      <FlatList
        contentContainerStyle={{
          padding: 16,
        }}
        data={books}
        keyExtractor={(item) => item.idBook.toString()}
        renderItem={({ item }) => (
          <BookCard
          book={item}
          isAdmin={user?.role === 'Admin'}
          onPress={() => onBookPress?.(item.idBook)}
          onEdit={() => onEditPress?.(item.idBook)}
          onDelete={async () => {
            await apiService.deleteBook(item.idBook);
            loadBooks();
          }}         
          />
        )}
      />
    </View>
  );
};

export default BookListScreen;