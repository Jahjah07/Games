import { ImageBackground, StyleSheet, View, useWindowDimensions, Image } from 'react-native';
import React, { useState } from 'react';
import Header from './Header';
import ManFigure from './ManFigure';
import WordBox from './WordBox';
import { WordsArray } from './data';
import InputBox from './InputBox';
import Keyboard from './Keyboard';
import StatusPopup from './StatusPopup';

const Index = () => {
  const [correctLetters, setCorrectLetters] = useState<string[]>([]); // Initialize as an empty array
  const [wrongLetters, setWrongLetters] = useState('');
  const [status, setStatus] = useState<"" | "win" | "completed" | "lost">(''); // Define the type of status
  const [currentIndex, setCurrentIndex] = useState(0);

  const correctWord = WordsArray[currentIndex].answer;

  const storeCorrectLetters = (keyInput: string) => {
    const ans = correctWord.toUpperCase();
    if (ans.includes(keyInput)) {
      const cl = [...correctLetters, keyInput]; // Add keyInput to correctLetters array
      setCorrectLetters(cl);
      // check win
      updateStatus(cl);
    } else {
      const wl = wrongLetters + keyInput;
      setWrongLetters(wl);
      if (wl.length > 5) {
        // lost
        setStatus('lost');
      }
    }
  };

  const updateStatus = (cl: string[]) => {
    let newStatus: "" | "win" | "completed" | "lost" = 'win'; // Default to 'win'
    const correctWordArray = Array.from(correctWord.toUpperCase());
    correctWordArray.forEach(letter => {
      if (!cl.includes(letter)) {
        newStatus = '';
      }
    });
    if (newStatus === 'win' && currentIndex === WordsArray.length - 1) {
      newStatus = 'completed';
    }
    setStatus(newStatus);
  };

  const handlePopupButton = () => {
    if (status === 'win') {
      // go to next word
      setCurrentIndex(i => i + 1);
    }
    // clear all stored data
    setCorrectLetters([]);
    setWrongLetters('');
    setStatus('');
    // replay
    if (status === 'completed') {
      setCurrentIndex(0);
    }
  };

  const { width } = useWindowDimensions();
  return (
    <ImageBackground
      source={require('../../assets/hangman/Background.png')}
      style={{ width: '100%', height: '100%' }}
    >
    <View style={width > 600 ? styles.rowDesktop : styles.rowMobile}>
    <Image
        source={require('../../assets/hangman/title colored.png')}
        style={{ width: '100%', height: '90%', position: 'absolute',}}
      />
      <View style={styles.upper}>
        <View style={styles.shark}>
          <ManFigure wrongWord={wrongLetters.length} />
        </View>
        <View style={styles.row}>
          <WordBox wordData={WordsArray[currentIndex]} />
        </View>
      </View>
      <View style={styles.lower}>
      <InputBox correctLetters={correctLetters} answer={correctWord} />
      <Keyboard correctLetters={correctLetters} wrongLetters={wrongLetters} onPress={(input: any) => storeCorrectLetters(input)} />
      <StatusPopup status={status} onPress={handlePopupButton} />
      </View>
    </View>
    </ImageBackground>
  );
};

export default Index;

const styles = StyleSheet.create({
  rowMobile: {
    flex: 1,
    marginHorizontal: '5%',
  },
  rowDesktop: {
    flex: 1,
    marginHorizontal: '5%',
    width: '50%',
  },
  shark: {
    position: 'absolute',
    top: 80, // Adjust as needed
    left: 0
  },
  row: {
    maxWidth: 500,
    position: 'absolute',
    top: 20, // Adjust as needed
    left: 200
  },
  upper: {
    marginTop: '50%',
  },
  lower: {
    marginTop: 190,
  }
});
