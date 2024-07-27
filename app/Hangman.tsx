import React from 'react';
import { View, StatusBar, useColorScheme, StyleSheet } from 'react-native';
import Hangman from './hangman/index'

export default function HangmanGame() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode? 'light-content' : 'dark-content'} />
      <Hangman />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});