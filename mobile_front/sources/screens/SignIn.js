import React from 'react';
import { View, StyleSheet} from 'react-native';
import { Button, Caption, TextInput } from 'react-native-paper';

const SignIn = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPasswd] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          mode="outlined"
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          mode="outlined"
          value={password}
          onChangeText={text => setPasswd(text)}
        />
      </View>
      <View>
        <Caption>Forgot password ?</Caption>
      </View>
      <Button icon="login-variant" mode="contained" onPress={() => console.log('Pressed')}>
        Sign In
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  inputContainer : {
    paddingBottom: 10,
  }
});

export default SignIn;