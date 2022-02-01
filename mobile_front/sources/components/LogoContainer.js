import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const LogoContainer = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    flex: 0.5,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  logo : {
    width: 200,
    height: 50,
  },
});

export default LogoContainer;