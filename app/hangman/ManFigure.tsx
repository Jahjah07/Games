import { StyleSheet, View, Image } from 'react-native';
import React from 'react';

interface Props {
  wrongWord: number; // Define the type of wrongWord as number
}

const ManFigure: React.FC<Props> = ({ wrongWord }) => {
  const ropeHeight = 260 + (wrongWord * 10);
  const showSharkOpen = wrongWord < 6;

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/hangman/rope with vegetable.png')}
        style={{ width: 410, height: ropeHeight, position: 'absolute', top: -60, left: -50 }}
        />
      <Image
        source={require('../../assets/hangman/rope behind.png')}
        style={{ width: 410, height: 410, position: 'absolute', top: -68, left: -20, }}
        />
      <Image
        source={require('../../assets/hangman/post.png')}
        style={{ width: 410, height: 440, position: 'absolute', left:-20, top: -85 }}
        />
     {showSharkOpen ? (
        <Image
          source={require('../../assets/hangman/shark open.png')}
          style={{ width: 410, height: 410, position: 'absolute', top: -80, left: -20 }}
        />
      ) : (
        <Image
          source={require('../../assets/hangman/shark close.png')}
          style={{ width: 410, height: 410, position: 'absolute', top: -80, left: -20 }}
        />
      )}
      
    </View>
  );
};

export default ManFigure;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
});
