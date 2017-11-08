
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


export default class CustomerInfo extends React.Component{
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
    <Text style={styles.textStyle}>Name: {this.props.cName}</Text>
    <Text style={styles.textStyle}>Phone: {this.props.cPhone}</Text>
   <View style={{flex:1,justifyContent:'center', alignItems:'center', marginLeft:120}}>
    <Button onPress={this.props.onPressAction}>
    <Text>View route</Text>
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
    backgroundColor: '#ECEFF1',
    height:height*0.19,
    opacity:0.9,
    paddingTop:10,
    paddingLeft:10,
    marginLeft:20
} ,

textStyle:{
  justifyContent:'center',
  //color: 'white',
  fontSize:20,
}

});

module.exports = CustomerInfo;