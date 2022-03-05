import React from 'react';
import { Appbar } from 'react-native-paper';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setUserLoggedOut } from '../reducers/Actions/Auth';

const LogoutAction = () => {
  const dispatch = useDispatch();

  return <Appbar.Action icon="logout" color="white" onPress={() => dispatch(setUserLoggedOut())} />;
};


const Header = ({navigation, back, route}) => {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={'AREA'}/>
      {route.name === 'Profile' && <LogoutAction />}
    </Appbar.Header>
  );
};

Header.propTypes = {
  navigation: PropTypes.object.isRequired,
  back: PropTypes.object,
  route: PropTypes.object,
};


export default Header;