import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Caption, Headline, Title } from 'react-native-paper';
import PropTypes from 'prop-types';
import LargeButton from '../components/LargeButton';

const ProfileHeader = () => {
  return (
    <View style={styles.header}>
      <Avatar.Image
        style={{marginBottom: 10}}
        size={150}
        source={{
          uri: 'http://pbs.twimg.com/profile_images/1491248062882365449/XKc1fNnA_400x400.png'
        }} />
      <Headline>Mehdi Zehri</Headline>
      <Caption>mehdi.zehri@epitech.eu</Caption>
    </View>
  );
};

const ProfileContent = () => {
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

const Profile = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <ProfileHeader navigation={navigation} />
      <ProfileContent />
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
    paddingTop: 20,
    flex: 0.7,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

ProfileHeader.propTypes = {
  navigation: PropTypes.object,
};


export default Profile;