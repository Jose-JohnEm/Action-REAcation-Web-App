import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Headline } from 'react-native-paper';
import PropTypes from 'prop-types';
import LargeButton from '../components/LargeButton';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo}/>
        <Headline style={styles.headline}>
          Automation platform of his digital life.
        </Headline>
      </View>
      <View style={styles.containerBtn}>
        <LargeButton onPress={() => navigation.push('Sign In')} mode="contained">
          Sign In
        </LargeButton>
        <LargeButton onPress={() => navigation.push('Sign Up')} mode="outlined">
          Sign Up
        </LargeButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingBottom: 5,
    flex: 1,
  },
  containerLogo: {
    flex: 0.5,
    paddingTop: 200,
  },
  containerBtn : {
    flex: 1,
  },
  logo : {
    width: 200,
    height: 50,
    alignSelf: 'center',
  },
  headline : {
    textAlign: 'center',
    color:'#0077b6',
    padding: 10
  },
  btn : {
    padding: 10,
  }
});

Home.propTypes = {
  navigation: PropTypes.object,
};


export default Home;