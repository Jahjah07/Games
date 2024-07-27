import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Svg, { Ellipse, G, Line, Rect } from 'react-native-svg'; // Import Line directly
import colors from '../../common/colors';

interface Props {
  wrongWord: number; // Define the type of wrongWord as number
}

const ManFigure: React.FC<Props> = ({ wrongWord }) => {
  const Rope = <Line x1="200" y1="0" x2="200" y2="140" stroke="brown" strokeWidth="5" />;
  const Head = <Ellipse cx="200" cy="150" rx="40" ry="25" fill={colors.shapeColor} />;
  const Nack = <Rect width="10" height="50" x="195" y="150" fill={colors.shapeColor} />;
  const Hands = <Line x1="260" y1="200" x2="140" y2="200" stroke={colors.shapeColor} strokeLinecap="round" strokeWidth="10" />;
  const Body = <Rect width="10" height="50" x="195" y="200" fill={colors.shapeColor} />;
  const Legs = (
    <G>
      <Line x1="200" y1="250" x2="150" y2="300" stroke={colors.shapeColor} strokeLinecap="round" strokeWidth="10" />
      <Line x1="200" y1="250" x2="250" y2="300" stroke={colors.shapeColor} strokeLinecap="round" strokeWidth="10" />
    </G>
  );

  return (
    <View style={styles.container}>
      <Svg viewBox="0 0 300 400" preserveAspectRatio="xMinYMin meet"  width="140" height="200">
        <Rect fill={colors.FrameColor} width="250" height="10" x="5" y="15" />
        <Rect fill={colors.FrameColor} width="10" height="350" x="20" y="0" />
        <Rect fill={colors.FrameColor} width="250" height="40" x="0" y="350" />
        {wrongWord > 0 ? Rope : null}
        {wrongWord > 1 ? Head : null}
        {wrongWord > 2 ? Nack : null}
        {wrongWord > 3 ? Hands : null}
        {wrongWord > 4 ? Body : null}
        {wrongWord > 5 ? Legs : null}
      </Svg>
    </View>
  );
};

export default ManFigure;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
});
