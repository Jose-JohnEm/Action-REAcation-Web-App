import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Button, Headline } from 'react-native-paper';
import PropTypes from 'prop-types';
import { getAllServices, setIcon } from '../../Utils/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../reducers/Actions/UserData';
import { setServicesAction, setServicesReaction } from '../../reducers/Actions/Area';

const ServicesItem = ({navigation, name, reaction}) => {
  const dispatch = useDispatch();
  const icon = setIcon(name);

  return (
    <View style={{padding: 10}}>
      <Button contentStyle={styles.btn} icon={icon} mode="outlined" onPress={() => {
        if (reaction === false){
          dispatch(setServicesAction(name));
          navigation.push('Action');
        } else {
          dispatch(setServicesReaction(name));
          navigation.push('Reaction');
        }
      }}
      >
        {name}
      </Button>
    </View>
  );
};

const Services = ({navigation, route}) => {
  const {data} = useSelector(state => state.userReducer);
  const { reaction } = route.params;
  const dispatch = useDispatch();
  const [services, setServices] = React.useState([]);
  const renderItem = ({ item }) => {
    if (item.reactions?.length > 0)
      return (<ServicesItem navigation={navigation} name={item.name} reaction={reaction} />);
  };

  useEffect(() => {
    getAllServices().then((data) => setServices(data));
    dispatch(getUserData());
  }, []);

  console.log(JSON.stringify(services, 0, 2));
  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>
        Choose a service
      </Headline>
      {!reaction &&
      <ScrollView>
        {!reaction && data?.services?.map((item, key) => {
          if (item !== 'discord' && item !=='email' && item !=='timer' && item !=='slack')
            return <ServicesItem navigation={navigation} name={item} reaction={reaction} key={key}/>;
        }
        )}
      </ScrollView>
      }
      {reaction &&
           <FlatList
             data={services}
             keyExtractor={item => item.name}
             renderItem={renderItem}
           />
      }
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
    justifyContent: 'center',
  },
  btn : {
    padding: 10,
  }
});

Services.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

ServicesItem.propTypes = {
  navigation: PropTypes.object,
  name: PropTypes.string,
  reaction: PropTypes.bool,
};


export default Services;