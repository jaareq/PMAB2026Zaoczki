import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { AuthUser } from '../types/models';

type Props = {
  user: AuthUser;
  onBooksPress: () => void;
  onAuthorsPress: () => void;
  onCategoriesPress: () => void;
  onLogout: () => void;
};

const HomeScreen = ({
  user,
  onBooksPress,
  onAuthorsPress,
  onCategoriesPress,
  onLogout,
}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>📚</Text>
        <Text style={styles.title}>BookStore</Text>
        <Text style={styles.subtitle}>Witaj, {user.name}</Text>
        <Text style={styles.role}>Rola: {user.role}</Text>

        <TouchableOpacity style={styles.button} onPress={onBooksPress}>
          <Text style={styles.buttonText}>Książki</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onAuthorsPress}>
          <Text style={styles.buttonText}>Autorzy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onCategoriesPress}>
          <Text style={styles.buttonText}>Kategorie</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Wyloguj</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  logo: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 17,
    color: '#475569',
    textAlign: 'center',
    marginTop: 8,
  },
  role: {
    fontSize: 14,
    color: '#2563EB',
    textAlign: 'center',
    marginBottom: 34,
    marginTop: 4,
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 17,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 14,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 17,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#DC2626',
  },
  logoutText: {
    color: '#DC2626',
    fontSize: 17,
    fontWeight: '800',
  },
});