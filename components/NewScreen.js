import React from 'react';
import {
  AppRegistry,
  Text,
  View,
} from 'react-native';

export default class NewScreen extends React.Component {
  static navigationOptions = {
    title: 'asfasd',
  };
  render() {
    return (
      <View>
        <Text>Chat with wildan in new screen</Text>
      </View>
    );
  }
}