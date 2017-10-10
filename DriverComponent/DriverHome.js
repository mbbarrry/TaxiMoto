import React from 'react';
import {
  AppRegistry,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';

import { Container, Drawer, Header, Content, Form, Item, Input,Icon } from 'native-base';
import AppHeader from './appHeader'


export default class DriverHome extends React.Component {
  static navigationOptions = {
    title: 'DriverHome',
  };

 constructor(props) {
    super(props);
  }

  render() {
    return (
<View style = {styles.container}>
 <AppHeader/>
  <Text>My driver content here </Text>
  </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
  });