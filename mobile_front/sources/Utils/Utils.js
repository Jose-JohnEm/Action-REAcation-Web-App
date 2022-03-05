import axios from 'axios';
import { Alert } from 'react-native';
import { API_URL } from '../constant/Constant';

export const getAllServices = async () => {
  try {
    const response = await axios.get(API_URL + '/about.json');
    return response.data.server.services;
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

