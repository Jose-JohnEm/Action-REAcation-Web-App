import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Avatar, Caption, Headline, Title } from 'react-native-paper';
import PropTypes from 'prop-types';
import LargeButton from '../components/LargeButton';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserData, updateUserServices } from '../reducers/Actions/UserData';
import { getAllServices, setIcon } from '../Utils/Utils';


const ProfileHeader = () => {
  const {data} = useSelector(state => state.userReducer);

  return (
    <View style={styles.header}>
      <Avatar.Image
        style={{marginBottom: 10}}
        size={150}
        source={{
          uri: 'http://pbs.twimg.com/profile_images/1491248062882365449/XKc1fNnA_400x400.png'
        }} />
      <Headline>{data.firstName} {data.lastName}</Headline>
      <Caption>{data.email}</Caption>
    </View>
  );
};

const Item = ({ title }) => {
  const {data} = useSelector(state => state.userReducer);
  const services = data?.services !== undefined ? data?.services : [];
  const icon = setIcon(title);
  const dispatch = useDispatch();

  const updateService = (title) => {
    const index = services?.indexOf(title);
    if (index > -1) {
      services?.splice(index, 1);
      dispatch(updateUserServices({services: services}));
    } else {
      services?.push(title);
      dispatch(updateUserServices({services: services}));
    }
  };


  return (
    <LargeButton icon={icon}
      mode={data?.services?.includes(title) ? 'contained' : 'outlined'}
      style={styles.socialBtn}
      onPress={() => {
        updateService(title);
      }}
    >
      {title}
    </LargeButton>
  );
};

const ProfileContent = () => {
  const dispatch = useDispatch();
  const [services, setServices] = React.useState([]);

  useEffect(() => {
    getAllServices().then((data) => setServices(data));
    dispatch(getUserData());
  }, []);

  return (
    <View style={styles.container}>
      <Title style={{textAlign: 'center'}}>Services</Title>
      <Caption style={{textAlign: 'center'}}>
        The services you subscribed
      </Caption>
      <FlatList
        data={services}
        renderItem={({item}) => <Item title={item.name} />}
        keyExtractor={item => item.name}
      />
    </View>
  );
};

const Profile = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshOnFocus = navigation.addListener('focus', () => {
      dispatch(getUserData());
    });

    return refreshOnFocus;
  }, []);

  return (
    <View style={{flex: 1}}>
      <ProfileHeader navigation={navigation} />
      <ProfileContent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingBottom: 5,
    flex: 1,
  },
  header : {
    paddingTop: 20,
    flex: 0.7,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

ProfileHeader.propTypes = {
  navigation: PropTypes.object,
};

Item.propTypes = {
  title: PropTypes.string,
};

export default Profile;