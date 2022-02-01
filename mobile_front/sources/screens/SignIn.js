import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { Caption, TextInput, Title } from 'react-native-paper';
import LargeButton from '../components/LargeButton';
import PropTypes from 'prop-types';
import SocialButtonGroup from '../components/SocialButtonGroup';
import LogoContainer from '../components/LogoContainer';

const SignInForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPasswd] = React.useState('');

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        mode="outlined"
        onChangeText={text => setEmail(text)}
        style={{marginBottom: 10}}
      />
      <TextInput
        placeholder="Password"
        mode="outlined"
        value={password}
        secureTextEntry={true}
        onChangeText={text => setPasswd(text)}
        style={{marginBottom: 10}}
      />
      <LargeButton onPress={() => console.log('Sign Up')} mode="contained">
          Sign Up
      </LargeButton>
      <Caption>Forgot password ?</Caption>
    </View>
  );
};

const SignIn = ({navigation}) => {
  return (
    <View style={styles.container}>
      <LogoContainer />
      <View style={{flex: 1}}>
        <Title>
          Welcome Back !
        </Title>
        <Caption>
          Please sign in to your account
        </Caption>
        <SignInForm />
        <SocialButtonGroup />
        <Caption style={{textAlign: 'center'}}>
          {'Don\'t have an account? '}
          <Text onPress={() => navigation.push('Sign Up')} style={{color: '#0077b6'}}>
            Sign Up
          </Text>
        </Caption>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
});

SignIn.propTypes = {
  navigation: PropTypes.object,
};


export default SignIn;