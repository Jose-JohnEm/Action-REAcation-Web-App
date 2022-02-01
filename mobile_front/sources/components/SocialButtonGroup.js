import React from 'react';
import { StyleSheet, View } from 'react-native';
import LargeButton from './LargeButton';

const SocialButtonGroup = () => {
  return (
    <View style={styles.btnContainer}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <LargeButton onPress={() => console.log('Sign Up')} mode="text" icon="google">
          Google
        </LargeButton>
      </View>
      <View style={{flex: 1}}>
        <LargeButton onPress={() => console.log('Sign Up')} mode="text" icon="facebook">
          Facebook
        </LargeButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btn : {
    padding: 10,
  },
  btnContainer : {
    flexDirection : 'row',
  }
});

export default SocialButtonGroup;