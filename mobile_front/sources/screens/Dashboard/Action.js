import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';
import {Picker} from '@react-native-picker/picker';
import LargeButton from '../../components/LargeButton';

const ActionPicker = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState();

  return (
    <Picker
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) =>
        setSelectedLanguage(itemValue)
      }>
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>
  );
};

const ActionParams = () => {
  const [text, setText] = React.useState('');

  return (
    <View>
      <TextInput
        label="${PARAMETER}"
        value={text}
        mode="outlined"
        onChangeText={text => setText(text)}
      />
    </View>
  );
};

const Action = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>
        Choose an action
      </Headline>
      <ActionPicker />
      <Headline style={styles.headline}>
        Put a parameter
      </Headline>
      <ActionParams />
      <LargeButton onPress={() => navigation.push('Confirm')} mode="contained">
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
  headline : {
    textAlign: 'center',
    color:'#0077b6',
    padding: 10
  },
  btnContainer : {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  btn : {
    padding: 10,
  }
});

Action.propTypes = {
  navigation: PropTypes.object,
};


export default Action;