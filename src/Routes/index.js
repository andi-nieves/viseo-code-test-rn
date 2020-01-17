import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LaunchScreen from '../Screens/LaunchScreen';
import Login from '../Screens/Login';
import List from '../Screens/List';
import RepoDetailsComponent from '../Screens/RepoDetailsComponent';

const AppNavigator = createStackNavigator(
  {
    LaunchScreen: {
      screen: LaunchScreen,
    },
    Login: {
      screen: Login,
    },
    List: {
      screen: List,
    },
    RepoDetailsComponent: {
      screen: RepoDetailsComponent
    }
  },
  {
    initialRouteName: 'LaunchScreen',
    headerMode: 'none',
  },
);

export default createAppContainer(AppNavigator);
