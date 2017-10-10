import React from 'react';
import {StyleSheet, Alert, View Text, StatusBar, Dimensions } from "react-native";
import {Header, Icon} from 'native-base';

export default class SideBar extends React.Component{

	constructor(props){
		super(props);
	}

render(){
	return(

		<View style={styles.container}>
			<Text>my sidebar</Text>
		</View>

		);
}

}

const styles = StyleSheet.create({
container:{
	flex:1,
	alignItems:'center',
	justifyContent:'center'
}
});