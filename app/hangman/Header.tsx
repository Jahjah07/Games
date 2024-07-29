import { StyleSheet, View, Image } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/hangman/title colored.png')}
        style={{ width: '100%', height: '120%', position: 'absolute', top: 10, marginTop: 10,}}
      />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    margin: 20,
    alignItems: 'center',
  },
})