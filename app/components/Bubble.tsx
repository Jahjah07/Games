import React, { useRef, useState } from 'react';
import { View, Image, PanResponder, StyleSheet, Dimensions } from 'react-native';

const Bubble: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageSize = 100; // Replace with the actual width and height of your image
  const giftImage = require('../../assets/spinthewheel/gift1.png');

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const { width, height } = Dimensions.get('window');
        const newX = gestureState.moveX - imageSize /2; // Adjust for image width
        const newY = gestureState.moveY - imageSize /2 ; // Adjust for image height
        // console.log('gestureState.moveX:', gestureState.moveX);
        // console.log('gestureState.moveY:', gestureState.moveY);
        // console.log('newX:', newX);
        // console.log('newY:', newY);
        setPosition({ x: Math.max(0, Math.min(width - imageSize, newX)), y: Math.max(0, Math.min(height - imageSize, newY)) }); // Clamp position within screen
      },
      onPanResponderRelease: () => {
        // Optionally handle end of drag
      },
    })
  ).current;

  return (
    <View
      style={[
        styles.bubble,
        {
          transform: [{ translateX: position.x }, { translateY: position.y }],
        }
      ]}
      {...panResponder.panHandlers}
    >
      <View pointerEvents="none">
        <Image source={giftImage} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    width: 100, // Adjust based on your image size
    height: 100, // Adjust based on your image size
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Bubble;
