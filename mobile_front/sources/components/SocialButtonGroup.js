import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { office, signInOAuth } from '../reducers/Actions/Auth';
import LargeButton from './LargeButton';

const githubConfig = {
  redirectUrl: 'com.areamobile://auth/',
  clientId: '130f1798e1232a9c2801',
  clientSecret: '1e5e8be69ee6ccf9cf8af077108f41b32c93f733',
  scopes: ['identity'],
  additionalHeaders: { 'Accept': 'application/json' },
  serviceConfiguration: {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint:
      'https://github.com/settings/connections/applications/130f1798e1232a9c2801'
  }
};
const officeConfig = {
  issuer: 'https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86/v2.0',
  clientId: 'd79ed9d2-e049-4eb2-8970-f0408ffc7fc5',
  redirectUrl: 'com.areamobile://auth/',
  scopes: ['openid', 'profile', 'email', 'offline_access'],
  additionalParameters: {prompt: 'select_account'},
};


const SocialButtonGroup = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.btnContainer}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <LargeButton onPress={() => {
          dispatch(signInOAuth(githubConfig));
        }} mode="text" icon="github">
          Github
        </LargeButton>
      </View>
      <View style={{flex: 1}}>
        <LargeButton onPress={() => {
          dispatch(signInOAuth(officeConfig));
        }} mode="text" icon="microsoft-office">
          Office
        </LargeButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btn : {
    padding: 10,
  },
  btnContainer : {
    flexDirection : 'row',
  }
});

export default SocialButtonGroup;