/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LandingPage from './Pages/LandingPage';
import SignupPage from './Pages/SignupPage';
import GraphsPage from './Pages/GraphsPage';


const RootStack = createStackNavigator(
  {
    LandingPage:LandingPage,
    SignupPage:SignupPage,
    GraphsPage:GraphsPage
  },
  {
    initialRouteName: 'LandingPage'
  }
);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <RootStack/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
