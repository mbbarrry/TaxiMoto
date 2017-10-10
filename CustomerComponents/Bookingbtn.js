
import React from 'react';
import {StyleSheet, View , Alert, Dimensions } from "react-native";
import { InputGroup, Button, Text, Header, Content, Form, Item, Input} from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";


const {width, height}= Dimensions.get('window');

export default class Bookingbtn extends React.Component {
 constructor(props) {
  super(props);

 }

  render() {
    return (
  <View style={{flex:1}}>
  <Button style={styles.btnStyle} onPress={this.props.onPressAction}>
      <Text style={styles.btnText}> Find Driver </Text>
    </Button>
  </View>
         
  );
  }
}
const styles= StyleSheet.create({
   btnStyle: {
        top:350,
        justifyContent:"center",
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: 'green',
        height: 45,
        width: width*0.7,
        margin: 10,
        paddingHorizontal: 10
      },
       btnText: {
        fontSize: 20,
        color: 'rgb(236, 240, 241)',
        fontWeight: 'bold'
    },

  });