
import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Dimensions
      }
from 'react-native';
import { Container, Drawer, Header, Content, Toast, Button, Text, Icon , Left, Right} from 'native-base';

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
  	<View style= {{justifyContent:'center',borderRadius:12, height:height*0.05, backgroundColor:'black', marginLeft:0}}>
    <Text style={{marginLeft: 130, color:"white", fontSize:17}}>Driver found!</Text>
    </View>
    <View style={{marginLeft:10, marginTop:15}}>
    <Text style={styles.textStyle}>Name:{this.state.dName} </Text>
    <Text style={styles.textStyle}>Phone:{this.state.dPhone}</Text>
     </View>
     <View style={{flex:1,justifyContent:'center', alignItems:'center', marginLeft:120}}>
    <Button  >
    <Text>Track Driver</Text>
    </Button>
    </View>
  </View>

);
}

}

const styles= StyleSheet.create({
container:{
  top:200,
    position:"absolute",
    width:width*0.9,
    borderRadius:12,
    backgroundColor: '#90A4AE',
    height:height*0.22,
    opacity:0.9,
    paddingLeft:0,
    marginLeft:20
} ,

textStyle:{
  justifyContent:'center',
  color: 'white',
  fontSize:20,
}

});

module.exports = DriverInfo;