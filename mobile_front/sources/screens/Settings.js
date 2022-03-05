import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Title } from 'react-native-paper';
import PropTypes from 'prop-types';
import LargeButton from '../components/LargeButton';
import { useDispatch } from 'react-redux';
import { updateUser } from '../reducers/Actions/UserData';

const SettingsForm = () => {
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
        keyboardType="email-address"
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
        Object.keys(body).forEach((k) => body[k] == '' && delete body[k]);

        dispatch(updateUser({body}));
      }}
      mode="contained"
      >
          Save
      </LargeButton>
    </View>
  );
};


const Settings = () => {
  return (
    <View style={styles.container}>
      <Title style={{textAlign: 'center'}}>Edit your profile</Title>
      <SettingsForm />
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