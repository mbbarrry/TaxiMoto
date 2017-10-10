// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   View
// } from 'react-native';
// import MapContainer from './CustomerComponents/MapContainer'

// //import CustomerHomeScreen from './CustomerComponents/CustomerHomeScreen'

// //import Router from './components/Router'
// //import DriverHome from './DriverComponent/DriverHome'
//  //import Config from './shared/Config'

// // Config.init();
//  export default class TaxiMoto extends Component {
 
// render() {
// return (
 
//  <MapContainer/>
//     //   //<DriverHome />
//     //   //<HomeScreen/>
//      );
//   }
//  }

// // skip this line if using Create React Native App

// //AppRegistry.registerComponent('TaxiMoto', () => Router);

// AppRegistry.registerComponent('TaxiMoto', () => TaxiMoto);
// // 





import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import SimpleApp from './Navigation/Routes'

AppRegistry.registerComponent('TaxiMoto', () => SimpleApp);