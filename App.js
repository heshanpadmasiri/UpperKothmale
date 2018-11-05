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
import TablePage from './Pages/TablePage';
import StatusPage from './Pages/StatusPage';

import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import reducer from './States/reducer';

//todo: change this to the public ip the server
const client = axios.create({
  baseURL: 'https://192.168.1.103:8081'
});

const store = createStore(reducer,applyMiddleware(axiosMiddleware(client)));


const RootStack = createStackNavigator(
  {
    LandingPage:LandingPage,
    SignupPage:SignupPage,
    GraphsPage:GraphsPage,
    TablePage:TablePage,
    StatusPage:StatusPage
  },
  {
    initialRouteName: 'LandingPage'
  }
);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <RootStack/>
      </Provider>
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
