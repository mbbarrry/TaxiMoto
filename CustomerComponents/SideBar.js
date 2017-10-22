import React from 'react';
import {
	 AppRegistry,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Dimensions
}
from 'react-native';
import { Container, Drawer, Header, Content, Toast, Button, Icon , Left, Right} from 'native-base';

const {width, height}= Dimensions.get('window');

export default class Sidebar extends React.Component{
	render(){
		return(
			<Content style={{backgroundColor:"#E0F2F1"}}>
				<View style={styles.profile}>
                 <Icon name="person" style={{fontSize:50}}/>
                 <Text>Mamadou</Text>
				</View>
			</Content>
			);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  profile:{
  	flexDirection:"row",
  	width:width,
  	height: height*5
  }

  });