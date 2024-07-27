import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { GameCard } from './components/GameCard';
import { Stack } from 'expo-router';

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Get Food Games' }} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <GameCard title="Hangman" linkTo="/Hangman" />
          <GameCard title="Spin The Wheel" linkTo="/SpinTheWheel" />
          <GameCard title="Match The Vegetables" linkTo="/MemoryMatch" />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
});