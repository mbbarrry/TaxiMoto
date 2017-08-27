import React from 'react';
import {
  AppRegistry,
  Text,
  View,
} from 'react-native';

export default class TemplateScreen extends React.Component {
  static navigationOptions = {
    title: 'Template Screen',
  };
  render() {
    return (
      <View>
        <Text>This is a template screen</Text>
      </View>
    );
  }
}