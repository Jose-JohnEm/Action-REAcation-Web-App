import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { FAB, Headline, IconButton, Paragraph } from 'react-native-paper';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../reducers/Actions/UserData';
import {clearArea, deleteAREA} from '../../reducers/Actions/Area';

const Item = ({ name, actionService, reactionService, index }) => {
  const dispatch = useDispatch();

  return (
    <View style={{paddingTop: 20}}>
      <View style={styles.containerItem}>
        <View style={styles.containerContent}>
          <Headline>{name}</Headline>
          <Paragraph style={styles.serviceName}>{actionService}{' --> '}{reactionService}</Paragraph>
        </View>
        <View style={{alignSelf: 'center'}}>
          <IconButton
            icon="trash-can-outline"
            color="red"
            size={25}
            onPress={() => {
              dispatch(deleteAREA(index));
              console.log('oui');
              dispatch(getUserData());
            }}
          />
        </View>
      </View>
    </View>
  );
};


const Dashboard = ({navigation}) => {
  const {data} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshOnFocus = navigation.addListener('focus', () => {
      dispatch(getUserData());
      dispatch(clearArea());
    });

    return refreshOnFocus;
  }, []);

  const renderItem = ({ item, index }) => <Item name={item.name} actionService={item.action.service} reactionService={item.reaction.service} index={index}/>;

  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>
        My AREA
      </Headline>
      {data && data?.events?.length > 0 && <FlatList
        data={data?.events}
        renderItem={renderItem}
        extraData={data}
        keyExtractor={item => item.name}
      /> || <Headline style={{textAlign: 'center'}}>You have 0 actions/reaction, tap on the + to add one.</Headline>
      }
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.push('Services', {
          reaction: false
        })}
      />
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
  fab: {
    backgroundColor: '#0077b6',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  serviceName: {
    textTransform: 'uppercase'
  }
});

Dashboard.propTypes = {
  navigation: PropTypes.object,
};

Item.propTypes = {
  name: PropTypes.string,
  actionService: PropTypes.string,
  reactionService: PropTypes.string,
  index: PropTypes.number,
};


export default Dashboard;