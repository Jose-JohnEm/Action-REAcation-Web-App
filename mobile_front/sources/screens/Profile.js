import React from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Appbar, Caption, Title } from 'react-native-paper';
import PropTypes from 'prop-types';
import LargeButton from '../components/LargeButton';

const ProfileHeader = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Appbar.Header style={styles.appbarContainer}>
        <Appbar.BackAction onPress={() => navigation.pop()} color="white" style={styles.backAction}/>
        <Appbar.Content
          title="USERNAME"
          color="white"
          titleStyle={styles.textAppBar}
        />
        <Appbar.Action icon="cog" onPress={() => {}} color="white"/>
      </Appbar.Header>
      <ImageBackground
        style={styles.banner}
        source={{
          uri: 'https://images.unsplash.com/photo-1544348817-5f2cf14b88c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
        }} />
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
    flex: 1,
  },
  appbarContainer : {
    backgroundColor: 'transparent',
    zIndex: 1,
    alignSelf: 'baseline',
    display: 'flex'
  },
  textAppBar: {
    textShadowColor: 'black',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
    fontSize: 25,
  },
  backAction : {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
  },
  avatar : {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  banner : {
    height: '100%',
    width: '100%',
    position: 'absolute',
  }
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

ProfileHeader.propTypes = {
  navigation: PropTypes.object,
};


export default Profile;