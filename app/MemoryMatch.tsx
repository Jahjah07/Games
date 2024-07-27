import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ImageBackground } from 'react-native';

interface Vegetable {
  name: string;
  image: any;
}

const vegetables: Vegetable[] = [
  { name: 'Tomato', image: require('../assets/foods/Tomato.png') },
  { name: 'Apple_Green', image: require('../assets/foods/Apple_Green.png') },
  { name: 'Banana_Peeled', image: require('../assets/foods/Banana_Peeled.png') },
  { name: 'Blueberry', image: require('../assets/foods/Blueberry.png') },
  { name: 'Cabbage', image: require('../assets/foods/Cabbage.png') },
  { name: 'Carrot', image: require('../assets/foods/Carrot.png') },
  { name: 'Cauliflower', image: require('../assets/foods/Cauliflower.png') },
  { name: 'Cherry', image: require('../assets/foods/Cherry.png') },
  { name: 'Corn', image: require('../assets/foods/Corn.png') },
  { name: 'Pumpkin', image: require('../assets/foods/Pumpkin.png') },
];

const duplicateVegetables: Vegetable[] = [...vegetables, ...vegetables];

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const GameScreen: React.FC = () => {
  const [cards, setCards] = useState<Vegetable[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [timer, setTimer] = useState<number>(120);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const shuffledVegetables = shuffleArray(duplicateVegetables).slice(0, 25);
    setCards(shuffledVegetables);
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      if (cards[firstIndex].name === cards[secondIndex].name) {
        setMatchedCards((prevMatchedCards) => [...prevMatchedCards, cards[firstIndex].name]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards, cards]);

  //win condition
  useEffect(() => {
    if (matchedCards.length === vegetables.length) {
      if (intervalId) clearInterval(intervalId); 
      const timeTaken = 120 - timer;
      Alert.alert('Congratulations!', `You matched all the vegetables in ${timeTaken} seconds!`, [
        { text: 'Play Again', onPress: () => resetGame() },
      ]);
    }
  }, [matchedCards, timer, intervalId]);

  //lose condition
  useEffect(() => {
    if (timer === 0) {
      if (intervalId) clearInterval(intervalId);
      Alert.alert("Time's Up!", 'You ran out of time!', [{ text: 'Try Again', onPress: () => resetGame() }]);
    }
  }, [timer, intervalId]);
 
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    setIntervalId(countdown);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const handleCardPress = (index: number) => {
    if (flippedCards.length < 2 && !flippedCards.includes(index) && !matchedCards.includes(cards[index].name) && matchedCards.length < 12) {
      setFlippedCards((prevFlippedCards) => [...prevFlippedCards, index]);
    }
  };

  const resetGame = () => {
    const shuffledVegetables = shuffleArray(duplicateVegetables).slice(0, 25);
    setCards(shuffledVegetables);
    setFlippedCards([]);
    setMatchedCards([]);
    setTimer(120);

    const newCountdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    setIntervalId(newCountdown);
  };

  return (
    <ImageBackground
      source={require('../assets/foods/background.png')}
      style={{ width: '100%', height: '100%' }}
    >
      <Image
          source={require('../assets/foods/title.png')}
          style={{ width: '100%', height: '100%', position: 'absolute',}}
        />
    <View style={styles.container}>
      <Text style={styles.timer}>Time: {timer}s</Text>
      <View style={styles.grid}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => handleCardPress(index)}
            disabled={flippedCards.includes(index) || matchedCards.includes(card.name) || matchedCards.length === 12}
          >
            <Image
              source={
                flippedCards.includes(index) || matchedCards.includes(card.name)
                  ? card.image
                  : require('../assets/foods/lead.png')
              }
              style={styles.image}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 24,
    marginTop: 100,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '10%'
  },
  card: {
    width: 60,
    height: 60,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default GameScreen;
