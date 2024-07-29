import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, ImageBackground, StyleSheet, ColorValue } from 'react-native';
import Svg, { Circle, ClipPath, Defs, G, Path } from 'react-native-svg';
import { Audio } from 'expo-av';
import { segments } from "../data";
import WinningModal from './components/WinningModal';
import Bubble from './components/Bubble';

const radius = 150;
const initialRotation = 90;
const imageSize = 50;

const CircleSpinner: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [winningColor, setWinningColor] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);
  const [confettiSoundObject, setConfettiSoundObject] = useState<Audio.Sound | null>(null);
  const [isSpinSoundLoaded, setIsSpinSoundLoaded] = useState(false);
  const [attempts, setAttempts] = useState(3); // Add state for attempts

  const centerX = 150;
  const centerY = 150;

  useEffect(() => {
    const loadSounds = async () => {
      try {
        const [spinSound, confettiSound] = await Promise.all([
          Audio.Sound.createAsync(require('../assets/spinthewheel/sounds/spin-sound_1.mp3')),
          Audio.Sound.createAsync(require('../assets/spinthewheel/sounds/you-win-1.mp3')),
        ]);
        setSoundObject(spinSound.sound);
        setConfettiSoundObject(confettiSound.sound);
        setIsSpinSoundLoaded(true);
      } catch (error) {
        console.error('Error loading sounds:', error);
      }
    };
  
    loadSounds();
  
    return () => {
      soundObject?.unloadAsync();
      confettiSoundObject?.unloadAsync();
    };
  }, []);

  const spinWheel = useCallback(() => {
    if (attempts <= 0) {
      return; // Do nothing if no attempts left
    }

    const spinDuration = Math.random() * 5000 + 2000;
    let startTime = Date.now();
    let animationId = null;

    const easeOutCubic = (t: number) => {
      return 1 - Math.pow(1 - t, 3);
    };

    const playSound = async () => {
      if (soundObject && isSpinSoundLoaded) {
        try {
          await soundObject.playAsync();
          await soundObject.setIsLoopingAsync(true);
        } catch (error) {
          console.error('Error playing spin sound:', error);
        }
      }
    };

    playSound();

    animationId = setInterval(() => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const t = elapsed / spinDuration;
      const angleDelta = 360 * easeOutCubic(t);
      setAngle((prevAngle) => (prevAngle - angleDelta) % 360);
    }, 10);

    setTimeout(() => {
      clearInterval(animationId);
      if (soundObject) {
        soundObject.stopAsync().catch(error => console.error('Error stopping spin sound:', error));
      }

      setAngle((prevAngle) => {
        const segmentAngle = 360 / segments.length;
        const finalSegmentAngle = (prevAngle + 360) % 360;
        const segmentIndex = Math.floor(finalSegmentAngle / segmentAngle);

        if (segmentIndex >= 0 && segmentIndex < segments.length) {
          setWinningColor(segments[segmentIndex].name);
        } else {
          setWinningColor('No Winner');
        }
        setIsSpinning(false);
        setIsModalVisible(true);
        return prevAngle;
      });
      
      // Decrement attempts
      setAttempts((prevAttempts) => prevAttempts - 1);
    }, spinDuration);
  }, [soundObject, isSpinSoundLoaded, attempts]);

  const renderImage = (): React.ReactNode[] => {
    return segments.map((segment: { imagePath: any; }, index: number) => {
      const segmentAngle = 360 / segments.length;
      
      const offsetFromCenter = radius - imageSize / 2 - 50;
      const segmentStartAngle = index * segmentAngle - 90;
      const imageAngle = segmentStartAngle + segmentAngle / 2;
      const imageX = centerX + offsetFromCenter * Math.cos((imageAngle - angle) * (Math.PI / 180));
      const imageY = centerY + offsetFromCenter * Math.sin((imageAngle - angle) * (Math.PI / 180));

      
      return (
        <Image
          key={index}
          source={segment.imagePath}
          style={{
            position: 'absolute',
            width: imageSize,
            height: imageSize,
            left: imageX - imageSize / 2,
            top: imageY - imageSize / 2,
          }}
        />
      );
    });
  };

  const renderSegments = (): React.ReactNode[] => {
    const arcLength = 360 / segments.length;

    return segments.map((segment: {id: React.Key | null | undefined; name: React.Key | null | undefined; color: ColorValue | undefined; }, index: number) => {
      const startAngle = index * arcLength;
      const endAngle = startAngle + arcLength;
      const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
      const startX = centerX + radius * Math.cos(startAngle * (Math.PI / 180));
      const startY = centerY + radius * Math.sin(startAngle * (Math.PI / 180));
      const endX = centerX + radius * Math.cos(endAngle * (Math.PI / 180));
      const endY = centerY + radius * Math.sin(endAngle * (Math.PI / 180));

      const pathData = `
        M ${centerX} ${centerY}
        L ${startX} ${startY}
        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
        Z
      `;

      return (
        <Path
          key={segment.id}
          d={pathData}
          fill={segment.color}
        />
      );
    });
  };

  const handleSpin = () => {
    if (!isSpinning && attempts > 0) {
      setIsSpinning(true);
      spinWheel();
    }
  };

  return (
    <ImageBackground
      source={require('../assets/spinthewheel/Background.png')}
      style={{ width: '100%', height: '100%' }}
    >
      <Image
        source={require('../assets/spinthewheel/title.png')}
        style={{ width: '100%', height: '120%', position: 'absolute', top: 10, marginTop: 10,}}
      />
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: '8%'
      }}>
       
        <Svg width={300} height={300} viewBox="0 0 300 300">
          <Defs>
            <ClipPath id="circleClip">
              <Circle cx="150" cy="150" r="125" />
            </ClipPath>
          </Defs>
          <G clipPath="url(#circleClip)" transform={`rotate(${-(angle + initialRotation)}, ${centerX}, ${centerY})`}>
            {renderSegments()}
            {renderImage()}
          </G>
          <Circle cx="150" cy="150" r="125" fill="transparent" strokeWidth={2} stroke="black" />
        </Svg>

        <Image
          source={require('../assets/spinthewheel/frame and pointer 2.png')}
          style={{ width: 300, height: 372, position: 'absolute', top: '25%' }}
        />
         {/* Display attempts left */}
         <Text style={styles.attemptsText}>
          Attempts Left: {attempts}
        </Text>
        <TouchableOpacity
          onPress={handleSpin}
          style={{
            marginTop: 20,
            backgroundColor: '#007bff',
            padding: 10,
            borderRadius: 5,
            opacity: attempts > 0 ? 1 : 0.5, // Change opacity based on attempts
          }}
          disabled={attempts <= 0} // Disable button if no attempts left
        >
          <Text style={{ color: 'white' }}>
            {isSpinning ? 'Spinning...' : attempts > 0 ? 'SPIN' : 'No Attempts Left'}
          </Text>
        </TouchableOpacity>
        {isModalVisible && winningColor !== null && (
          <WinningModal 
            winningColor={winningColor} 
            isVisible={isModalVisible} 
            onClose={() => setIsModalVisible(false)} 
          />
        )}
        {/* <Bubble /> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  attemptsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CircleSpinner;
