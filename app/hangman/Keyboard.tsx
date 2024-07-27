import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../common/colors'

interface KeyProps {
  text: string;
  onPress: (text: string) => void;
  disabled: boolean;
}

const Key: React.FC<KeyProps> = ({ text, onPress, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onPress(text)} 
      style={[styles.keyContainer, { backgroundColor: disabled ? '#99a' : colors.key }]}>
      <Text style={styles.key}>{text}</Text>
    </TouchableOpacity>
  )
}

interface KeyboardProps {
  onPress: (text: string) => void;
  correctLetters: string[];
  wrongLetters: string;
}


const Keyboard: React.FC<KeyboardProps> = ({ onPress, correctLetters, wrongLetters }) => {
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  return (
    <View style={styles.container}>
      {keys.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key, colIndex) => {
            const disable = correctLetters.includes(key) || wrongLetters.includes(key);
            return (
              <Key
                key={colIndex}
                text={key}
                onPress={onPress}
                disabled={disable}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default Keyboard

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  keyContainer: {
    width: 30,
    height: 38,
    backgroundColor: colors.key,
    borderRadius: 8,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  key: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
