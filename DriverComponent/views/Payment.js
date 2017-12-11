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

const Payment=(props)=>(
<View style={{flex:1, backgroundColor:'#212121', opacity:0.9}}>
 <View style={styles.modal}>
      <View style={{flexDirection:'row'}}>
        <Text style={{marginLeft:15, color:'black'}} >Fare:</Text> 
        <Text  style={{marginLeft:150, color:'black'}}>RM {props.fare}</Text>
      </View>
       <View style={{flexDirection:'row'}}>
        <Text style={{marginLeft:15, color:'black'}}>PaymentMethod:</Text> 
        <Text  style={{marginLeft:75, color:'black'}}>{props.paymentMethod}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={{marginLeft:15, color:'black'}} >Discount:</Text> 
        <Text style={{marginLeft:125, color:'black'}}>RM 0</Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={{marginLeft:15, color:'black'}}>Total:</Text> 
        <Text style={{marginLeft:150, color:'black'}}>RM {props.fare}</Text>
      </View>
   </View>

   <View style={{alignItems:'center', justifyContent:'center', marginLeft:150}}>
        <Button style={{alignItems:'center', justifyContent:'center',width:width*0.3, backgroundColor:'rgb(39, 174, 96)', top: 255}}
        onPress={props.onPaid}
        >
          <Text style={{color: "#fff", fontWeight:'bold', fontSize:15}}>Proceed</Text> 
        </Button>
  </View>
</View>  
)

const styles=StyleSheet.create({
  modal:{
    flexDirection:'column',
    justifyContent: 'space-between',
    top: 250,
    marginLeft:70,
    width:width * 0.7,
    borderRadius:7,
    height:height*0.2,
    backgroundColor:"#fff",
  }
});

module.exports= Payment;
