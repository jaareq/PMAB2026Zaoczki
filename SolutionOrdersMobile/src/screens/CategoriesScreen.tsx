import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { TextInput } from 'react-native';
import { AuthUser } from '../types/models';
import apiService from '../api/apiService';

type Props = {
  onBack?: () => void;
  user?: AuthUser | null;
};

const CategoriesScreen = ({ onBack, user }: Props) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await fetch(
        'http://192.168.16.1:5067/api/BookCategories'
      );

      const data = await response.json();

      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async () => {
    if (!name) {
      return;
    }

    try {
      await apiService.createBookCategory({ name });
      setName('');
      loadCategories();
    } catch (error) {
      console.error(error);
    }
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
          Kategorie
        </Text>
      </View>

      {user?.role === 'Admin' && (
        <View style={{ padding: 12 }}>
          <TextInput
            placeholder="Nazwa kategorii"
            value={name}
            onChangeText={setName}
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
            onPress={addCategory}
          >
            <Text style={{ color: 'white', fontWeight: '700' }}>
              Dodaj kategorię
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={categories}
        keyExtractor={(item) =>
          item.idBookCategory.toString()
        }
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
              {item.name}
            </Text>

            {user?.role === 'Admin' && (
              <TouchableOpacity
                onPress={async () => {
                  try {
                    await apiService.deleteBookCategory(item.idBookCategory);
                    loadCategories();
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

export default CategoriesScreen;