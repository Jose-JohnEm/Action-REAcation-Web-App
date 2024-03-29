import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Caption, Headline, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';
import {Picker} from '@react-native-picker/picker';
import LargeButton from '../../components/LargeButton';
import { getAllServices, getServerUrl } from '../../Utils/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { setAction, setParameterAction, setTitleAREA } from '../../reducers/Actions/Area';
import Clipboard from '@react-native-clipboard/clipboard';

const ActionTitle = ({title, setTitle}) => {
  return (
    <View>
      <TextInput
        label="Set your AREAction's name"
        value={title}
        mode="outlined"
        onChangeText={text => setTitle(text)}
      />
    </View>
  );
};

const ActionPicker = ({selectedAction, setSelectedAction}) => {
  const {serviceAction} = useSelector(state => state.areaReducer);
  const [services, setServices] = React.useState([]);

  useEffect(() => {
    getAllServices().then((data) => setServices(data));
  }, []);

  return (
    <Picker
      selectedValue={selectedAction}
      onValueChange={(itemValue) =>
        setSelectedAction(itemValue)
      }>
      {services?.map((item) =>
        item.name == serviceAction && item?.actions?.map((picker, key) => (
          <Picker.Item label={picker.description} value={picker.name} key={key}/>
        ))
      )}
    </Picker>
  );
};

const ActionParams = ({parameter, setParameter}) => {
  const [label, setLabel] = React.useState('');
  const {serviceAction} = useSelector(state => state.areaReducer);


  useEffect(() => {
    const getLabel = () => {
      switch (serviceAction) {
      case 'github':
        return 'Your repository';
      case 'discord':
        return 'Your username';
      case 'pivotaltracker':
        return 'Your projectID';
      case 'intra':
        return 'Your token';
      case 'teams':
        return 'Your botname';
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

const Action = ({navigation}) => {
  const {serviceAction} = useSelector(state => state.areaReducer);
  const [selectedAction, setSelectedAction] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [parameter, setParameter] = React.useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    getServerUrl().then((data) => setUrl(data));
  }, []);

  const copyToClipboard = () => {
    Clipboard.setString(`${url}/webhooks/${serviceAction}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Headline style={styles.headline}>
        Choose an AREAction name
        </Headline>
        <ActionTitle title={title} setTitle={setTitle}/>
        {(serviceAction === 'github' || serviceAction === 'pivotaltracker' || serviceAction === 'teams') &&
      <>
        <Caption style={styles.errorCaption}>
          { `Set this ${url}/webhooks/${serviceAction} to the webhook's parameter of the service`}
        </Caption>
        <TouchableOpacity onPress={copyToClipboard}>
          <Caption style={styles.errorCaption}>Click here to copy to Clipboard</Caption>
        </TouchableOpacity>
      </>
        }

        <Headline style={styles.headline}>
        Choose an Action
        </Headline>
        <ActionPicker selectedAction={selectedAction} setSelectedAction={setSelectedAction} />
        <Headline style={styles.headline}>
        Put a parameter
        </Headline>
        <ActionParams parameter={parameter} setParameter={setParameter}/>
        <LargeButton onPress={() => {
          dispatch(setTitleAREA(title));
          dispatch(setAction(selectedAction));
          dispatch(setParameterAction(parameter));
          navigation.push('Services', {
            reaction : true
          });
        }}
        mode="contained"
        >
        Next
        </LargeButton>
      </ScrollView>
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
  },
  errorCaption : {
    textAlign: 'center',
    color:'red',
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

ActionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
};

ActionPicker.propTypes = {
  selectedAction: PropTypes.string.isRequired,
  setSelectedAction: PropTypes.func.isRequired,
};

ActionParams.propTypes = {
  parameter: PropTypes.string.isRequired,
  setParameter: PropTypes.func.isRequired,
};

export default Action;