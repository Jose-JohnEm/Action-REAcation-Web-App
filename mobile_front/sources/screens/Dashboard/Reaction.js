import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';
import {Picker} from '@react-native-picker/picker';
import LargeButton from '../../components/LargeButton';
import { getAllServices } from '../../Utils/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { setParameterReaction, setReaction } from '../../reducers/Actions/Area';

const ReactionPicker = ({selectedReaction, setSelectedReaction}) => {
  const [services, setServices] = React.useState([]);

  useEffect(() => {
    getAllServices().then((data) => setServices(data));
  }, []);

  return (
    <Picker
      selectedValue={selectedReaction}
      onValueChange={(itemValue) =>
        setSelectedReaction(itemValue)
      }>
      {services?.map((item) =>
        item?.reactions?.map((picker, key) => (
          <Picker.Item label={picker.description} value={picker.name} key={key}/>
        ))
      )}
    </Picker>
  );
};

const ReactionParams = ({parameter, setParameter}) => {
  const [label, setLabel] = React.useState('');
  const {serviceReaction} = useSelector(state => state.areaReducer);


  useEffect(() => {
    const getLabel = () => {
      switch (serviceReaction) {
      case 'discord':
        return 'Your username';
      case 'email':
        return 'Your email';
      case 'slack':
        return 'Your userid';
      default:
        break;
      }
    };
    setLabel(getLabel());
  }, []);

  return (
    <View>
      <TextInput
        label={label}
        value={parameter}
        mode="outlined"
        onChangeText={text => setParameter(text)}
      />
    </View>
  );
};

const Reaction = ({navigation}) => {
  const [selectedReaction, setSelectedReaction] = React.useState('');
  const [parameter, setParameter] = React.useState('');
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>
        Choose an action
      </Headline>
      <ReactionPicker selectedReaction={selectedReaction} setSelectedReaction={setSelectedReaction}/>
      <Headline style={styles.headline}>
        Put a parameter
      </Headline>
      <ReactionParams parameter={parameter} setParameter={setParameter}/>
      <LargeButton onPress={() => {
        dispatch(setReaction(selectedReaction));
        dispatch(setParameterReaction(parameter));
        navigation.push('Confirm');
      }}
      mode="contained"
      >
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

ReactionPicker.propTypes = {
  selectedReaction: PropTypes.string.isRequired,
  setSelectedReaction: PropTypes.func.isRequired,
};

ReactionParams.propTypes = {
  parameter: PropTypes.string.isRequired,
  setParameter: PropTypes.func.isRequired,
};

export default Reaction;