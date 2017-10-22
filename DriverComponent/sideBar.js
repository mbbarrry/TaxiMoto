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

import {
  Content,
  List,
  ListItem,
  Icon,
  Left,
  Body,
  Right,
  Thumbnail,
  Button
} from 'native-base';



export default class Sidebar extends React.Component{
	render(){
		return(
			<Content style={{backgroundColor:"#E0F2F1"}}>
             <Text>my drawer content</Text>
			</Content>
			);
	}
}