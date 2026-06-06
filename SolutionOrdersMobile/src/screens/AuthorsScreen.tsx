import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import { AuthUser } from '../types/models';
import apiService from '../api/apiService';

type Props = {
  onBack?: () => void;
  user?: AuthUser | null;
};

const AuthorsScreen = ({ onBack, user }: Props) => {
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    try {
      const response = await fetch(
        'http://192.168.16.1:5067/api/Authors'
      );

      const data = await response.json();

      setAuthors(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addAuthor = async () => {
    if (!firstName || !lastName) {
      return;
    }

    await apiService.createAuthor({ firstName, lastName });
    setFirstName('');
    setLastName('');
    loadAuthors();
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <View
        style={{
          backgroundColor: '#2563EB',
          paddingTop: 60,
          paddingBottom: 20,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity onPress={onBack}>
          <Text style={{ color: 'white', marginBottom: 12 }}>
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
          Autorzy
        </Text>
      </View>
      {user?.role === 'Admin' && (
      <View style={{ padding: 12 }}>
        <TextInput
          placeholder="Imię"
          value={firstName}
          onChangeText={setFirstName}
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 12,
            marginBottom: 8,
          }}
        />

        <TextInput
          placeholder="Nazwisko"
          value={lastName}
          onChangeText={setLastName}
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 12,
            marginBottom: 8,
          }}
        />

        <TouchableOpacity
          style={{
            backgroundColor: '#2563EB',
            padding: 12,
            borderRadius: 10,
            alignItems: 'center',
            marginBottom: 12,
          }}
          onPress={addAuthor}
        >
          <Text style={{ color: 'white', fontWeight: '700' }}>
            Dodaj autora
          </Text>
        </TouchableOpacity>
      </View>
      )}

      <FlatList
        data={authors}
        keyExtractor={(item) => item.idAuthor.toString()}
        renderItem={({ item }) => (
        <View
          style={{
            backgroundColor: 'white',
            margin: 12,
            padding: 16,
            borderRadius: 14,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
            }}
          >
            {item.firstName} {item.lastName}
          </Text>

          {user?.role === 'Admin' && (
          <TouchableOpacity
            onPress={async () => {
              try {
                await apiService.deleteAuthor(item.idAuthor);
                loadAuthors();
              } catch (error) {
                console.error(error);
              }
            }}
          >
            <Text
              style={{
                color: '#DC2626',
                marginTop: 10,
                fontWeight: '700',
              }}
            >
              Usuń
            </Text>
          </TouchableOpacity>
          )}
        </View>
      )}
      />
    </View>
  );
};

export default AuthorsScreen;