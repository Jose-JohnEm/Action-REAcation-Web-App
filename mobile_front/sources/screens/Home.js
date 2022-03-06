import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { Button, DefaultTheme, Headline, IconButton, Modal, Portal, Provider, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';
import LargeButton from '../components/LargeButton';
import { useDispatch } from 'react-redux';
import { clearArea } from '../reducers/Actions/Area';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0077b6',
    accent: '#fe4500',
  },
};

const Home = ({navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const [text, setText] = React.useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearArea());
  }, []);

  return (
    <View style={styles.container}>
      <Provider theme={theme}>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <TextInput
              label="SERVER URL"
              value={text}
              onChangeText={text => setText(text)}
            />
            <Button mode="text" onPress={() => {
              const setServerUrl = async () => {
                await EncryptedStorage.setItem('url', text);
              };
              setServerUrl();
              hideModal();
            }} >
              Save
            </Button>
          </Modal>
        </Portal>
        <IconButton
          icon="cog"
          color='#0077b6'
          style={{alignSelf: 'flex-end'}}
          size={20}
          onPress={showModal}
        />
        <View style={styles.containerLogo}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo}/>
          <Headline style={styles.headline}>
          Automation platform of his digital life.
          </Headline>
        </View>
        <View style={styles.containerBtn}>
          <LargeButton onPress={() => navigation.push('Sign In')} mode="contained">
          Sign In
          </LargeButton>
          <LargeButton onPress={() => navigation.push('Sign Up')} mode="outlined">
          Sign Up
          </LargeButton>
        </View>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingBottom: 5,
    flex: 1,
  },
  containerLogo: {
    flex: 1,
    paddingTop: 100,
  },
  containerBtn : {
    flex: 1,
  },
  logo : {
    width: 200,
    height: 50,
    alignSelf: 'center',
  },
  headline : {
    textAlign: 'center',
    color:'#0077b6',
    padding: 10
  },
  btn : {
    padding: 10,
  }
});

Home.propTypes = {
  navigation: PropTypes.object,
};


export default Home;