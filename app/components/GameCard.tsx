import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

type GameCardProps = {
  title: string;
  linkTo: string;
};

export const GameCard: React.FC<GameCardProps> = ({ title, linkTo }) => {
  return (
    <Link href={linkTo} asChild>
      <TouchableOpacity style={{
        borderWidth: 1,
        borderColor: 'black',
        padding: 4,
        borderRadius: 4,
        marginTop: 6,
        width: '75%',
      }}>
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: 'black',
          padding: 10,
          borderRadius: 5,
        }}>{title}</Text>
      </TouchableOpacity>
    </Link>
  );
};