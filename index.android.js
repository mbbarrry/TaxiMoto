/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';
import MapContainer from './CustomerComponents/MapContainer'

//import CustomerHomeScreen from './CustomerComponents/CustomerHomeScreen'

//import Router from './components/Router'

import Config from './shared/Config'

Config.init();
export default class TaxiMoto extends Component {
 


render() {
    return (
      <MapContainer />
    );
  }
}

// skip this line if using Create React Native App

//AppRegistry.registerComponent('TaxiMoto', () => Router);

AppRegistry.registerComponent('TaxiMoto', () => TaxiMoto);
