import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';

function LargeButton({children, onPress, mode}) {
  return (
    <Button
      contentStyle={styles.btn}
      style={{marginTop: 20}}
      mode={mode}
      onPress={onPress}>
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
};

export default LargeButton;