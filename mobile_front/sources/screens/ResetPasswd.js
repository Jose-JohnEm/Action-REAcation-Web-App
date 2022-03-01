import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Caption, TextInput, Title } from 'react-native-paper';
import LargeButton from '../components/LargeButton';
import PropTypes from 'prop-types';
import LogoContainer from '../components/LogoContainer';

const ResetPasswdForm = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        mode="outlined"
        onChangeText={text => setEmail(text)}
        style={{marginBottom: 10}}
      />
      <LargeButton onPress={() => console.log(true)} mode="contained">
          Reset your password
      </LargeButton>
      <Button mode="text" onPress={() => navigation.navigate('Home')}>Return to home</Button>
    </View>
  );
};

const ResetPasswd = ({navigation}) => {
  return (
    <View style={styles.container}>
      <LogoContainer />
      <View style={{flex: 1}}>
        <Title>
          Welcome Back !
        </Title>
        <Caption>
          Find your AREA account
        </Caption>
        <ResetPasswdForm navigation={navigation} />
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

ResetPasswd.propTypes = {
  navigation: PropTypes.object,
};

ResetPasswdForm.propTypes = {
  navigation: PropTypes.object,
};

export default ResetPasswd;