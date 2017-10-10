
import React from 'react';
import {StyleSheet, Dimensions, View } from "react-native";
import { InputGroup, Button, Text, Header, Content, Form, Item, Input, Picker} from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";

var width = Dimensions.get("window").width;



export default class Book extends React.Component {
 constructor(props) {
  super(props);
    this.state = {
      selected: "key1"
    };
    var Item = Picker.Item;
 }

onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }


  render() {
    return (
<View style={styles.searchResultsWrapper}>
  <View flexDirection="row">
  <Text style={styles.fareText}>Fare:RM </Text><Text style={styles.amount}>{this.props.thefare}</Text>
  </View>
  <View>
  <Picker
        selectedValue={this.state.selected}
        onValueChange={this.onValueChange.bind(this)}>
    <Item label="Cash" value="key1" />
    <Item label="Debit Card" value="key2" />
   </Picker>
  </View>
</View>
   
  );
  }
}
const styles= StyleSheet.create({
    searchResultsWrapper:{ 
    top:160,
    width:width*0.5,
    height:100,
    paddingTop:10,
    paddingLeft:20,
    backgroundColor: '#fff',
    borderRadius:4,
    opacity:0.9
    },

    fareText: {
        fontSize: 15
    },
    amount:{
        fontWeight:"bold",
        fontSize: 15
    },
    pickerwraper:{
      flex:1,
     backgroundColor: '#fff',
    }
  });