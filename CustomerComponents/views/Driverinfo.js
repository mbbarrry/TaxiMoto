import React from 'react';
import {
  AppRegistry,
  Text,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  ToastAndroid 
} from 'react-native';


import { Container, Drawer, Header, Content, Form, Item, Input, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height}= Dimensions.get('window'); 

const DriverInfo=(props)=>(
<View style={styles.container}>
	<Text>the driver info is here</Text>
</View>

)

const styles=StyleSheet.create({
	container:{
		flex:1
	}
});

module.exports= DriverInfo;