import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Caption, Title } from 'react-native-paper';
import PropTypes from 'prop-types';
import LargeButton from '../components/LargeButton';

const Settings = () => {
  return (
    <View style={styles.container}>
      <Title style={{textAlign: 'center'}}>Our Services</Title>
      <Caption style={{textAlign: 'center'}}>
        Lorem description services en balle
      </Caption>
      <ScrollView>
        <LargeButton icon="google" mode="outlined" style={styles.socialBtn}>
          Google
        </LargeButton>
        <LargeButton icon="google" mode="outlined" style={styles.socialBtn}>
          Google
        </LargeButton>
        <LargeButton icon="google" mode="outlined" style={styles.socialBtn}>
          Google
        </LargeButton>
        <LargeButton icon="google" mode="outlined" style={styles.socialBtn}>
          Google
        </LargeButton>
        <LargeButton icon="google" mode="outlined" style={styles.socialBtn}>
          Google
        </LargeButton>
        <LargeButton icon="google" mode="outlined" style={styles.socialBtn}>
          Google
        </LargeButton>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingBottom: 5,
    flex: 1,
  },
  header : {
    paddingTop: 10,
    flex: 0.7,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

Settings.propTypes = {
  navigation: PropTypes.object,
};

export default Settings;