import React from 'react';
import {
  AppRegistry,
  Text,
  View,
} from 'react-native';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Template Screen',
  };
  render() {
    return (
      <View>
        <Text>this is login</Text>
      </View>
    );
  }
}