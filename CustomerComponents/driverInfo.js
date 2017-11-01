import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	Alert,
	Dimensions
      }
from 'react-native';

const {width, height}= Dimensions.get('window'); 


export default class DriverInfo extends React.Component{
constructor(props){
	super(props);
	this.state={

	}
}

compoentDidMount(){

}

render(){
return(

	<View style={styles.container}>
	  <Text style={styles.textStyle}>Name: Barry</Text>
	  <Text style={styles.textStyle}>Phone: 01123848263</Text>
	  <Text style={styles.textStyle}>*********</Text>
	</View>

);
}

}


const styles= StyleSheet.create({
container:{
	top:450,
    position:"absolute",
    width:width*0.9,
    backgroundColor: 'black',
    height:140,
    opacity:0.9,
    alignItems:'center'
} ,

textStyle:{
	color: 'white',
	fontSize:20,
}

});

module.exports = DriverInfo;