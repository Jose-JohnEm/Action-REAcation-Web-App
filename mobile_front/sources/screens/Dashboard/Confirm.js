import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Caption, Headline, Paragraph } from 'react-native-paper';
import PropTypes from 'prop-types';
import LargeButton from '../../components/LargeButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAllServices } from '../../Utils/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { setAREA, setDescAction, setDescReaction } from '../../reducers/Actions/Area';

const setBody = (body, parameterAction, parameterReaction) => {
  switch (body.serviceAction) {
  case 'github':
    body.parameterAction = JSON.stringify({repository : parameterAction});
    break;
  case 'pivotaltracker':
    body.parameterAction = JSON.stringify({projectID : parameterAction});
    break;
  case 'intra':
    body.parameterAction = JSON.stringify({token : parameterAction});
    break;
  case 'teams':
    body.parameterAction = JSON.stringify({botname : parameterAction});
    break;
  default:
    break;
  }
  switch (body.serviceReaction) {
  case 'discord':
    body.parameterReaction = JSON.stringify({username : parameterReaction});
    break;
  case 'slack':
    body.parameterReaction = JSON.stringify({userid : parameterReaction});
    break;
  case 'email':
    body.parameterReaction = JSON.stringify({email : parameterReaction});
    break;
  default:
    break;
  }
  return body;
};

const Confirm = ({navigation}) => {
  const {title, action, reaction, descAction, descReaction, serviceAction, serviceReaction, parameterAction, parameterReaction} = useSelector(state => state.areaReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllServices().then((services) => {
      services && services?.map((item) => item?.actions?.map((picker) => {
        if (action == picker.name)
          dispatch(setDescAction(picker.description));
      }));
      services && services?.map((item) => item?.reactions?.map((picker) => {
        if (reaction == picker.name)
          dispatch(setDescReaction(picker.description));
      }));
    });
  }, []);

  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>{title}</Headline>
      <View style={styles.contentContainer}>
        <View style={styles.containerItem}>
          <View style={styles.containerContent}>
            <Headline style={{textAlign: 'center'}}>{descAction}</Headline>
            <Paragraph style={{textAlign: 'center'}}>{serviceAction} - {action}</Paragraph>
            <Caption style={{textAlign: 'center'}}>{parameterAction}</Caption>
          </View>
        </View>
        <Icon name="arrow-down-thick" size={70} style={{alignSelf:'center'}}/>
        <View style={styles.containerItem}>
          <View style={styles.containerContent}>
            <Headline style={{textAlign: 'center'}}>{descReaction}</Headline>
            <Paragraph style={{textAlign: 'center'}}>{serviceReaction} - {reaction}</Paragraph>
            <Caption style={{textAlign: 'center'}}>{parameterReaction}</Caption>
          </View>
        </View>
      </View>
      <View style={styles.containerBtn}>
        <LargeButton
          onPress={() => {
            const body = {
              title: title,
              action: action,
              reaction: reaction,
              serviceAction: serviceAction,
              serviceReaction: serviceReaction,
            };
            dispatch(setAREA(setBody(body, parameterAction, parameterReaction)));
            navigation.navigate('Dashboard');
          }}
          mode="contained">
        Confirm
        </LargeButton>
        <LargeButton
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
          mode="contained"
          color='red'
        >
        Cancel
        </LargeButton>
      </View>
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
    paddingBottom: 10
  },
  contentContainer: {
    flex: 1,
  },
  containerBtn: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    borderColor: '#0077b6',
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevated: 20,
  },
  containerContent : {
    flex: 0.9
  },
});

Confirm.propTypes = {
  navigation: PropTypes.object,
};


export default Confirm;