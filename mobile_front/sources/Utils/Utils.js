import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

export const getAllServices = async () => {
  const url = await EncryptedStorage.getItem('url');

  try {
    const response = await axios.get(url + '/about.json');
    console.log(response?.data?.server.services);
    return response.data.server.services;
  } catch (error) {
    console.err(error);
  }
};

export const getServerUrl = async () => {
  const url = await EncryptedStorage.getItem('url');

  try {
    const response = await axios.get(url + '/about.json');
    console.log(response?.data?.server.url);
    return response.data.server.url;
  } catch (error) {
    console.err(error);
  }
};

export const setIcon = (icon) => {
  switch (icon) {
  case 'google':
    return 'google';
  case 'teams':
    return 'microsoft-teams';
  case 'github':
    return 'github';
  case 'discord':
    return 'discord';
  case 'email':
    return 'at';
  case 'slack':
    return 'slack';
  default:
    return 'desktop-mac-dashboard';
  }
};

export const cleanObj = (obj) => {
  for (var propName in obj) {
    if (obj[propName] === '') {
      delete obj[propName];
    }
  }
  return obj;
};

