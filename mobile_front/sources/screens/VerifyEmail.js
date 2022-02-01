import React from 'react';
import { View, StyleSheet} from 'react-native';
import { TextInput, Title } from 'react-native-paper';
import LargeButton from '../components/LargeButton';
import PropTypes from 'prop-types';
import LogoContainer from '../components/LogoContainer';

const ResetPasswdForm = () => {
  const [email, setEmail] = React.useState('');

  return (
    <View>
      <TextInput
        placeholder="The code"
        value={email}
        mode="outlined"
        keyboardType='numeric'
        onChangeText={text => setEmail(text)}
        style={{marginBottom: 10}}
      />
      <LargeButton onPress={() => console.log(true)} mode="contained">
        Verify your email
      </LargeButton>
    </View>
  );
};

const ResetPasswd = ({navigation}) => {
  return (
    <View style={styles.container}>
      <LogoContainer />
      <View style={{flex: 1}}>
        <Title>
          Verify your Email
        </Title>
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