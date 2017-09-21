
import React from 'react';
import {StyleSheet,Alert } from "react-native";
import { InputGroup, Text, Header, Content, Form, Item, Input, View} from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";


export default class Book extends React.Component {
 constructor(props) {
  super(props);

 }

  render() {
    return (
<View style={styles.searchResultsWrapper}>
  <Text>Fare: RM {this.props.thefare}<Text>

</View>
         
  );
  }
}
const styles= StyleSheet.create({
    searchResultsWrapper:{
        top:200,
        position:"absolute",
        width:500,
        height:450,
        backgroundColor:"#fff",
        opacity:0.9
    },
  });