import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../../common/colors';

interface Props {
  correctLetters: string[]; // Assuming correctLetters is an array of strings
  answer: string; // Assuming answer is a string
}

const InputBox: React.FC<Props> = ({ correctLetters, answer }) => {
  return (
    <View style={styles.inputContainer}>
      {answer.split('').map((letter, index) => {
        const l = letter.toUpperCase();
        return (
          <Text key={index} style={styles.text}>
            {correctLetters.includes(l) ? l : '_'}
          </Text>
        );
      })}
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: colors.inputBox,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 3,
  },
});
