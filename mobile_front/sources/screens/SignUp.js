import React from 'react';
import { View, StyleSheet, Text, ScrollView} from 'react-native';
import { Caption, TextInput, Title } from 'react-native-paper';
import LargeButton from '../components/LargeButton';
import PropTypes from 'prop-types';
import SocialButtonGroup from '../components/SocialButtonGroup';
import LogoContainer from '../components/LogoContainer';
import { useDispatch } from 'react-redux';
import { signUp } from '../reducers/Actions/Auth';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [lastName, setLastName] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPasswd] = React.useState('');

  return (
    <View>
      <TextInput
        placeholder="First Name"
        value={firstName}
        mode="outlined"
        onChangeText={text => setFirstName(text)}
        style={{marginBottom: 10}}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        mode="outlined"
        onChangeText={text => setLastName(text)}
        style={{marginBottom: 10}}
      />
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
      <LargeButton onPress={() => {
        const body = {
          firstName: firstName,
          lastName: lastName,
          email : email,
          password: password,
          confirmPassword: password
        };
        dispatch(signUp(body));
      }}
      mode="contained"
      >
          Sign Up
      </LargeButton>
    </View>
  );
};

const SignUp = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <LogoContainer />
      <View style={{flex: 1, marginTop: 50, marginBottom: 50}}>
        <Title>
          Create New Account
        </Title>
        <Caption>
          Please fill in the form to continue
        </Caption>
        <SignUpForm />
        <SocialButtonGroup />
        <Caption style={{textAlign: 'center'}}>
          {'Already have an account ? '}
          <Text onPress={() => navigation.push('Sign In')} style={{color: '#0077b6'}}>
            Sign In
          </Text>
        </Caption>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
});

SignUp.propTypes = {
  navigation: PropTypes.object,
};


export default SignUp;