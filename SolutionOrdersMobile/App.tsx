import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, useColorScheme, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Greeting from './src/components/Greeting';
import Counter from './src/components/Counter';
import LoginScreen from './src/screens/LoginScreen';
import ItemsScreen from './src/screens/ItemsScreen';
import BookListScreen from './src/screens/BookListScreen';
import BookDetailsScreen from './src/screens/BookDetailsScreen';
import { AuthUser } from './src/types/models';
import AddBookScreen from './src/screens/AddBookScreen';
import EditBookScreen from './src/screens/EditBookScreen';
import HomeScreen from './src/screens/HomeScreen';
import AuthorsScreen from './src/screens/AuthorsScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';

function App(): React.JSX.Element {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [screen, setScreen] = useState<'home' | 'list' | 'details' | 'add' | 'edit' | 'authors' | 'categories'>('home');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  if (!user) {
    return (
      <LoginScreen
        onLoginSuccess={(loggedUser) => {
          setUser(loggedUser);
          setScreen('home');
        }}
      />
    );
  }

  if (screen === 'home') {
    return (
      <HomeScreen
        user={user}
        onBooksPress={() => setScreen('list')}
        onAuthorsPress={() => setScreen('authors')}
        onCategoriesPress={() => setScreen('categories')}
        onLogout={() => {
          setUser(null);
          setScreen('home');
        }}
      />
    );
  }

  if (screen === 'authors') {
    return (
      <AuthorsScreen
        user={user}
        onBack={() => setScreen('home')}
      />
    );
  }

  if (screen === 'categories') {
    return (
      <CategoriesScreen
        user={user}
        onBack={() => setScreen('home')}
      />
    );
  }

  if (screen === 'details' && selectedBookId !== null) {
    return (
      <BookDetailsScreen
        bookId={selectedBookId}
        onBack={() => setScreen('list')}
      />
    );
  }
  
  if (screen === 'add') {
    return (
      <AddBookScreen
        onBack={() => setScreen('list')}
        onBookAdded={() => setScreen('list')}
      />
    );
  }

  if (screen === 'edit' && selectedBookId !== null) {
    return (
      <EditBookScreen
        bookId={selectedBookId}
        onBack={() => setScreen('list')}
        onBookUpdated={() => setScreen('list')}
      />
    );
  }

  return (
    <BookListScreen
      user={user}
      onBackToMenu={() => setScreen('home')}
      onAddPress={() => setScreen('add')}
      onBookPress={(idBook) => {
        setSelectedBookId(idBook);
        setScreen('details');
      }}
      onEditPress={(idBook) => {
        setSelectedBookId(idBook);
        setScreen('edit');
      }}
    />
  );
}

export default App; 