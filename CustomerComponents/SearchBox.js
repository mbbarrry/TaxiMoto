
import React from 'react';
import {StyleSheet,Alert } from "react-native";
import { InputGroup, Text, Header, Content, Form, Item, Input, View} from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";


export default class SearchBox extends React.Component {
 constructor(props) {
  super(props);

 }

  render() {

    return (
<View style={styles.SearchBox}>
  <View style={styles.inputWrapper}>
  <InputGroup>
      <Icon name="search" size={15} color="#FF5E3A" />
      <Input  style={styles.inputSearch} 
       placeholder="Pick-Up Location"
       onChangeText={(text) => {this.props.handleInputChange(text, 'pick-up')}}
       value={this.props.addressName}
      />
  </InputGroup>  
  </View>   

<View style={styles.secondInputWrapper}>
  <InputGroup>
      <Icon name="search" size={15} color="#FF5E3A" />
      <Input  style={styles.inputSearch}  
       placeholder="Drop-Off Location"
       onChangeText={(text) => {this.props.handleInputChange(text, 'drop-off')}}
     
      />
  </InputGroup>  
    
  </View>   

</View>
         
  );
  }
}

const styles= StyleSheet.create({
  SearchBox:{
    top:10,
    width:350,
    paddingLeft:20,
    backgroundColor: '#fff',
    height:140
  },
  inputWrapper:{
    paddingLeft: 20,
    marginLeft:0,
    marginRight:85,
    marginTop:12,
    marginBottom:0,
    backgroundColor: "rgb(236, 240, 241)",
    opacity: 0.9,
   borderRadius:5,
   width:310
  },
  secondInputWrapper:{
    paddingLeft: 20,
    marginLeft:0,
    marginRight:85,
    marginTop: 10,
    marginBottom:0,
    backgroundColor: "rgb(236, 240, 241)",
    opacity: 0.9,
    borderRadius: 5,
    width:310
  },
  inputSearch:{
    fontSize: 15
  },
  label:{
        fontSize:10,
        fontStyle: "italic",
        marginLeft:10,
        marginTop:10,
        marginBottom:0
    }
  
  });