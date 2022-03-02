import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import PropTypes from 'prop-types';
import LargeButton from '../../components/LargeButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Confirm = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.containerItem}>
          <View style={styles.containerContent}>
            <Headline style={{textAlign: 'center'}}>Service</Headline>
            <Paragraph style={{textAlign: 'center'}}>ACTION</Paragraph>
          </View>
        </View>
        <Icon name="arrow-down-thick" size={100} style={{alignSelf:'center'}}/>
        <View style={styles.containerItem}>
          <View style={styles.containerContent}>
            <Headline style={{textAlign: 'center'}}>Service</Headline>
            <Paragraph style={{textAlign: 'center'}}>ACTION</Paragraph>
          </View>
        </View>
      </View>
      <View style={styles.containerBtn}>
        <LargeButton
          onPress={() => {
            console.log('Send request');
            navigation.navigate('Dashboard');
          }}
          mode="contained">
        Confirm
        </LargeButton>
        <LargeButton
          onPress={() => navigation.navigate('Dashboard')}
          mode="contained"
          color='red'
        >
        Cancel
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
  headline : {
    textAlign: 'center',
    color:'#0077b6',
  },
  contentContainer: {
    flex: 1,
  },
  containerBtn: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    borderColor: '#0077b6',
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevated: 20,
  },
  containerContent : {
    flex: 0.9
  },
});

Confirm.propTypes = {
  navigation: PropTypes.object,
};


export default Confirm;