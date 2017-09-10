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
      onChangeText={this.props.handleInputChange}
        
      />
  </InputGroup>  
  </View>   

<View style={styles.secondInputWrapper}>
  <InputGroup>
      <Icon name="search" size={15} color="#FF5E3A" />
      <Input  style={styles.inputSearch} 
      placeholder="Drop-Off Location"
      onChangeText={this.props.handleInputChange}
      />
  </InputGroup>  
    
  </View>   


</View>
         
  );
  }
}

const styles= StyleSheet.create({
  SearchBox:{
    top:65,
    position:"absolute",
    width:400,
    height: 50
  },
  inputWrapper:{
    paddingLeft: 20,
    marginLeft:0,
    marginRight:85,
    marginBottom:0,
    backgroundColor: "#fff",
    opacity: 0.9,
    borderRadius:7
  },
  secondInputWrapper:{
    paddingLeft: 20,
    marginLeft:0,
    marginRight:85,
    marginTop: 10,
    marginBottom:0,
    backgroundColor: "#fff",
    opacity: 0.9,
    borderRadius: 7
  },
  inputSearch:{
    fontSize: 15
  },
  
  });