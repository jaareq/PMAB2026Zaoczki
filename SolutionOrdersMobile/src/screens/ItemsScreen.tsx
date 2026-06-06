import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import ApiService from '../api/apiService';
import type { Item } from '../types/models';

const ItemsScreen = () => {

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const loadItems = async () => {
    try {
      const data = await ApiService.getItems();

      setItems(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>
        {item.name}
      </Text>

      <Text style={styles.price}>
        {item.price} zł
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Produkty
      </Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.idItem.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ItemsScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    padding: 16,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0f172a',
  },

  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 3,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },

  price: {
    fontSize: 16,
    color: '#2563eb',
    marginTop: 6,
  },
});