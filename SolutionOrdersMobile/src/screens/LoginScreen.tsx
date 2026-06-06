import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';

import apiService from '../api/apiService';
import { AuthUser } from '../types/models';

type Props = {
  onLoginSuccess?: (user: AuthUser) => void;
};

const LoginScreen = ({ onLoginSuccess }: Props) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('admin@test.pl');
  const [password, setPassword] = useState('admin');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Błąd', 'Wpisz email i hasło');
      return;
    }

    try {
      const user = await apiService.login({
        email,
        password,
      });

      Alert.alert('Sukces', `Witaj ${user.name}`);
      onLoginSuccess?.(user);
    } catch (error) {
      Alert.alert('Błąd', 'Nieprawidłowy email lub hasło');
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Błąd', 'Uzupełnij wszystkie pola');
      return;
    }

    try {
      const user = await apiService.register({
        name,
        email,
        password,
      });

      Alert.alert('Sukces', `Konto utworzone: ${user.name}`);
      onLoginSuccess?.(user);
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się utworzyć konta');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>📚</Text>
        <Text style={styles.title}>BookStore</Text>
        <Text style={styles.subtitle}>
          {isRegisterMode ? 'Utwórz nowe konto' : 'Twoja ulubiona księgarnia w kieszeni'}
        </Text>

        <View style={styles.form}>
          {isRegisterMode && (
            <TextInput
              style={styles.input}
              placeholder="Imię"
              placeholderTextColor="#94a3b8"
              value={name}
              onChangeText={setName}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Adres e-mail"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Hasło"
            placeholderTextColor="#94a3b8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.button}
            onPress={isRegisterMode ? handleRegister : handleLogin}
          >
            <Text style={styles.buttonText}>
              {isRegisterMode ? 'Zarejestruj się' : 'Zaloguj się'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {isRegisterMode ? 'Masz już konto? ' : 'Nie masz konta? '}
          </Text>

          <TouchableOpacity onPress={() => setIsRegisterMode(!isRegisterMode)}>
            <Text style={styles.registerLink}>
              {isRegisterMode ? 'Zaloguj się' : 'Zarejestruj się'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 5,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    color: '#1E293B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  footerText: {
    color: '#64748B',
    fontSize: 15,
  },
  registerLink: {
    color: '#2563EB',
    fontWeight: '700',
    fontSize: 15,
  },
});