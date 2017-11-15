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

const RateComplaint=(props)=>(
<View style={styles.container}>
	
</View>

)

const styles=StyleSheet.create({
	container:{
		flex:1
	}
});

module.exports= RateComplaint;