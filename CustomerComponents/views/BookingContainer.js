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


import { Container, Drawer, Header, Content, Form, Input, Button, Picker} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height}= Dimensions.get('window'); 
 var Item = Picker.Item;
const BookingContainer=(props)=>(

<View style={styles.container}>

 <View style={styles.faireContainer}>
  <View style={{flexDirection:'row'}}>
  <Text style={styles.fareText}>Fare:RM </Text><Text style={styles.amount}>{props.thefare}</Text>
  </View>
  <Picker
        selectedValue={props.selectedValue}
        onValueChange={props.onValueChange}>
    <Item label="Cash" value="key1" />
    <Item label="Debit Card" value="key2" />
   </Picker>
    
</View>

  <Button style={styles.btnStyle} onPress={props.onPressAction}>
      <Text style={styles.btnText}> Find Driver </Text>
  </Button>
</View>
)

const styles=StyleSheet.create({

container:{
  top:170,
  width:width
},

faireContainer:{
    width:width*0.5,
    marginLeft:100,
    height:100,
    paddingTop:10,
    paddingLeft:20,
    backgroundColor: '#fff',
    borderRadius:4,
    opacity:0.9
},
btnStyle:{
    top:200,
        justifyContent:"center",
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: 'green',
        marginLeft:60,
        //height: 45,
        width: width*0.7,
        margin: 10,
        paddingHorizontal: 10
},
btnText: {
        fontSize: 20,
        color: 'rgb(236, 240, 241)',
        fontWeight: 'bold'
    }

});

module.exports= BookingContainer;
