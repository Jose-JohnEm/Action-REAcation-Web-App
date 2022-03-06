import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {useDispatch, useSelector}  from 'react-redux';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ResetPasswd from './ResetPasswd';
import Profile from './Profile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../components/Header';
import Dashboard from './Dashboard/Dashboard';
import Settings from './Settings';
import Action from './Dashboard/Action';
import Confirm from './Dashboard/Confirm';
import Reaction from './Dashboard/Reaction';
import { DefaultTheme } from 'react-native-paper';
import Services from './Dashboard/Services';
import { useEffect } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import { setUserLoggedIn, setUserLoggedOut } from '../reducers/Actions/Auth';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0068b5',
    accent: '#fe4500',
  },
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      defaultscren="Profile"
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  return (
    <Stack.Navigator
      defaultscren="Settings"
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};


function AuthNav() {
  return (
    <Tab.Navigator
      initialRouteName="DashboardStack"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="DashboardStack"
        component={DashboardStack}
        options={{
          headerShown: false,
          color: 'white',
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Icon name="home" color={color} size={20} />
          ),
        }} />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          headerShown: false,
          color: '#fe4500',
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Icon name="person" color={color} size={20} />
          ),
        }} />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          headerShown: false,
          color: '#fe4500',
          tabBarLabel: 'Settings',
          tabBarIcon: ({color}) => (
            <Icon name="settings" color={color} size={20} />
          ),
        }} />
    </Tab.Navigator>
  );
}

const DashboardStack = () => {
  return (
    <Stack.Navigator
      defaultscren="Dashboard"
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Services" component={Services} />
      <Stack.Screen name="Action" component={Action} />
      <Stack.Screen name="Reaction" component={Reaction} />
      <Stack.Screen name="Confirm" component={Confirm} />
    </Stack.Navigator>
  );
};

const DefaultNav = () => {
  return (
    <Stack.Navigator defaultscren="Home">
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
      <Stack.Screen name="Sign In" component={SignIn} options={{headerShown: false}}/>
      <Stack.Screen name="Sign Up" component={SignUp} options={{headerShown: false}}/>
      <Stack.Screen name="Reset Passwd" component={ResetPasswd} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};

function Navigation() {
  const {isLogged} = useSelector(state => state.authReducer);
  const {data} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAccessToken = async () => {
      const accessToken = await EncryptedStorage.getItem('accessToken');
      if (accessToken && accessToken) {
        dispatch(setUserLoggedIn());
      } else {
        dispatch(setUserLoggedOut());
      }
    };
    console.log(data);
    getAccessToken();
  }, [dispatch]);

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        {isLogged === false ?
          <Stack.Screen
            name="DefaultNav"
            component={DefaultNav}
            options={{
              headerShown: false,
              color: '#fe4500',
              tabBarLabel: 'Home',
              tabBarIcon: ({color}) => (
                <Icon name="home" color={color} size={20} />
              ),
            }}
          />
          :
          <Stack.Screen
            name="AuthNav"
            component={AuthNav}
            options={{headerShown: false}}
          />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;