import React from 'react';
import {
	StyleSheet,
	Text,
	View,
  Dimensions
} from 'react-native';

import { Container, Drawer, Header, Content, Form, Item, Input, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height}= Dimensions.get('window'); 

const Trackdropoff=(props)=>(

 <View style={styles.footerContainer}>
      <View style={styles.customerInfo}>
        <Icon name="user" size={30} style={{marginLeft:5, marginTop:20}}/>
        <View style={{flexDirection:'column'}}>
        <Text style={{marginLeft:20, marginTop:5, fontSize:15, fontWeight:'bold', color:'rgb(39, 174, 96)'}}> DROP OFF </Text>
        <Text style={{marginLeft:20, fontSize:16, color:'#000000', marginTop:5}}> Mamadou </Text>
        <View style={{flexDirection:'row'}}>
        <Icon name="phone" size={20} style={{marginLeft:20, marginTop:6}} />
        <Text style={{marginLeft:20, marginTop:6, fontSize:15}}>01545584775</Text>     
        </View>
        </View>
        <Text style={{marginLeft:150, marginTop:20, fontSize:15}}>{props.duration}</Text>     
      </View>
      <Button style={{alignItems:'center', justifyContent:'center', marginLeft:17, marginTop:20, backgroundColor:'rgb(39, 174, 96)', borderRadius:5, width:width*0.9}}>
      <Text style={{color:'rgb(236, 240, 241)', fontSize:20, fontWeight:'bold'}}>START TRIP</Text>
      </Button> 
</View> 
   
)


const styles=StyleSheet.create({
footerContainer:{
  top:500,
    width:width,
    backgroundColor: 'white',
    height:height*0.25,
    opacity:15
},
customerInfo:{
flexDirection:'row',
width:width,
borderRadius:4,
backgroundColor:'#E0E0E0',
height:height*0.12
}
})

module.exports= Trackdropoff;