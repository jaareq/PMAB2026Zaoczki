import React from 'react';
import { View, ScrollView, StyleSheet, useColorScheme, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Greeting from './src/components/Greeting';
import Counter from './src/components/Counter';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView>
        <Counter />
        <Greeting name="Anna" age={25} />
        <Greeting name="Piotr" isVip={true} />
        <Greeting name="Kasia" age={30} isVip={true} />
        <Greeting name="Jan" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default App;