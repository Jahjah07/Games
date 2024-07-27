import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, StyleSheet, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';

const confettiImage = require('../../assets/spinthewheel/confetti.gif');

interface WinningModalProps {
  winningColor: string | null;
  isVisible: boolean;
  onClose: () => void;
}

const WinningModal: React.FC<WinningModalProps> = ({ winningColor, isVisible, onClose }) => {
  const confettiSoundObject = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const loadConfettiSound = async () => {
      if (isVisible) {
        if (confettiSoundObject.current) {
          await confettiSoundObject.current.unloadAsync();
        }
        const { sound } = await Audio.Sound.createAsync(require('../../assets/spinthewheel/sounds/you-win-1.mp3'));
        confettiSoundObject.current = sound;
        await confettiSoundObject.current.playAsync();
      }
    };

    loadConfettiSound();

    return () => {
      if (confettiSoundObject.current) {
        confettiSoundObject.current.unloadAsync();
      }
    };
  }, [isVisible]);

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <Image source={confettiImage} style={styles.confettiImage} />
      
      <View style={styles.modalContainer}>
      <ImageBackground
      source={require('../../assets/spinthewheel/coupon gold.png')}
      style={{ width: '100%', height: '100%' }}
    >
        <Text style={[styles.winningText, {color: '#000', marginTop: '25%', marginBottom:'5%'}]}>You Won:</Text>
        <Text style={[styles.winningText, { color: winningColor ? winningColor : '#000' }]}>
           {winningColor}!
        </Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        </ImageBackground>
      </View>
      
    </Modal>
  );
};

const styles = StyleSheet.create({
  confettiImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 200,
    width: 300,
    alignSelf: 'center',
    marginTop: '80%',
    borderRadius: 5,
  },
  winningText: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginRight: '5%',
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: '20%', 
    backgroundColor: '#007bff', 
    padding: 10,
    width: 100, 
    borderRadius: 5,
  },
  closeButtonText: {
    alignSelf: 'center',
    color: 'white',
  },
});

export default WinningModal;
