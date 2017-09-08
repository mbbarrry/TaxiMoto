import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput
} from 'react-native';

import {Header, Body, Title, Icon, Button, Left, Right} from 'native-base';

import MapContainer from './MapContainer'
import AppHeader from './appHeader'


export default class CustomerHomeScreen extends React.Component {
  

  render() {

    return (
      <View style={styles.container}>
      <AppHeader />
      <MapContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    input1:{ 
    
    borderRadius: 15,
}
  });

