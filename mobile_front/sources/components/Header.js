import React from 'react';
import { Appbar } from 'react-native-paper';
import PropTypes from 'prop-types';

const Header = ({navigation, back}) => {

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={'AREA'}/>
    </Appbar.Header>
  );
};

Header.propTypes = {
  navigation: PropTypes.object.isRequired,
  back: PropTypes.object,
  route: PropTypes.object,
};


export default Header;