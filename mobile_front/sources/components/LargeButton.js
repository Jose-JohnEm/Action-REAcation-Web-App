import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';

function LargeButton({children, onPress, mode, icon, color}) {
  return (
    <Button
      contentStyle={styles.btn}
      style={{marginTop: 20}}
      mode={mode}
      icon={icon}
      onPress={onPress}
      color={color}>
      {children}
    </Button>
  );
}

const styles = StyleSheet.create({
  btn : {
    padding: 10,
  }
});

LargeButton.propTypes = {
  children: PropTypes.string.isRequired,
  onPress: PropTypes.any,
  mode: PropTypes.string.isRequired,
  icon : PropTypes.string,
  color : PropTypes.string,
};

export default LargeButton;