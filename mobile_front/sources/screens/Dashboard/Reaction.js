import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';
import {Picker} from '@react-native-picker/picker';
import LargeButton from '../../components/LargeButton';

const ServicePicker = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState();

  return (
    <Picker
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) =>
        setSelectedLanguage(itemValue)
      }>
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
      <Picker.Item label="JavaScript" value="js" />
      <Picker.Item label="JavaScript" value="js" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>
  );
};

const ActionParams = () => {
  const [text, setText] = React.useState('');

  return (
    <View>
      <TextInput
        label="Params"
        value={text}
        mode="outlined"
        onChangeText={text => setText(text)}
      />
    </View>
  );
};

const Reaction = () => {
  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>
        Choose a service
      </Headline>
      <ServicePicker />
      <Headline style={styles.headline}>
        Choose an action
      </Headline>
      <ServicePicker />
      <Headline style={styles.headline}>
        Put a parameter
      </Headline>
      <ActionParams />
      <LargeButton icon="google" mode="contained">
        Next
      </LargeButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingBottom: 5,
    flex: 1,
  },
  logo : {
    width: 200,
    height: 50,
    alignSelf: 'center',
  },
  headline : {
    textAlign: 'center',
    color:'#0077b6',
    padding: 10
  },
  btn : {
    padding: 10,
  }
});

Reaction.propTypes = {
  navigation: PropTypes.object,
};


export default Reaction;