import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';

const LogoContainer = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    flex: Platform.OS === 'ios' ? 0.5 : 0.3,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  logo : {
    width: 200,
    height: 50,
  },
});

export default LogoContainer;