import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { Book } from '../types/models';

type Props = {
  book: Book;
  onPress?: () => void;
  isAdmin?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
};

const BookCard = ({ book, onPress, isAdmin, onDelete, onEdit }: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cover}>
        <Text style={styles.coverEmoji}>📖</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.authorName}</Text>

        <Text style={styles.category}>
          {book.categories?.join(', ') || 'Brak kategorii'}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>{book.price.toFixed(2)} zł</Text>
          <Text style={styles.rating}>⭐ {book.averageRating ?? 0}</Text>
          {isAdmin && (
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                <Text style={styles.deleteButtonText}>Usuń</Text>
            </TouchableOpacity>
          )}
          {isAdmin && (
            <TouchableOpacity style={styles.editButton} onPress={onEdit}>
                <Text style={styles.editButtonText}>Edytuj</Text>
            </TouchableOpacity>
            )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    flexDirection: 'row',
    elevation: 3,
  },
  cover: {
    width: 80,
    height: 110,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  coverEmoji: {
    fontSize: 32,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  author: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  category: {
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '600',
    marginTop: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: '#16A34A',
  },
  rating: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '600',
  },
  deleteButton: {
  marginTop: 10,
  backgroundColor: '#DC2626',
  paddingVertical: 8,
  borderRadius: 10,
  alignItems: 'center',
 },
 deleteButtonText: {
 color: '#FFFFFF',
 fontWeight: '800',
 },
 editButton: {
  marginTop: 10,
  backgroundColor: '#F59E0B',
  paddingVertical: 8,
  borderRadius: 10,
  alignItems: 'center',
},

editButtonText: {
  color: '#FFFFFF',
  fontWeight: '800',
},
});