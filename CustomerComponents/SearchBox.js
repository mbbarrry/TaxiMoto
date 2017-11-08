
import React from 'react';
import {StyleSheet, Dimensions, View } from "react-native";
import { InputGroup, Text, Header, Content, Form, Item, Input} from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";

var width = Dimensions.get("window").width;

let origin= null;

export default class SearchBox extends React.Component {
 constructor(props) {
  super(props);
   
}


render() {

    return (
<View style={styles.SearchBox}>
  <View style={styles.inputWrapper}>
  <InputGroup>
      <Icon name="search" style={{fontSize:20, color:'green'}} />
      <Input  style={styles.inputSearch} 
       placeholder="Pick-Up Location"
       onChangeText={(text) => {this.props.handleInputChange(text, 'pick-up')}}
       value={this.props.destination}
       onFocus={() => { this.props.displayFare(false)}}
       onBlur={() => { this.props.displayFare(true)}}
      />
  </InputGroup>  
  </View>   
<View style={styles.secondInputWrapper}>
  <InputGroup>
      <Icon name="search" style={{fontSize:20, color:'green'}}/>
      <Input  style={styles.inputSearch}  
       placeholder="Drop-Off Location"
       onChangeText={(text) => {this.props.handleInputChange(text, 'drop-off')}}
       //value={this.props.destinationName}
       onFocus={() => { this.props.displayFare(false) }}
       onBlur={() => { this.props.displayFare(true) }}
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
    position:"absolute",
    width:width*0.9,
    backgroundColor: '#fff',
    height:140,
    opacity:0.9
  },
  inputWrapper:{
    marginLeft:15,
    marginRight:10,
    marginTop:15,
    marginBottom:10,
    backgroundColor: "rgb(236, 240, 241)",
    //opacity: 0.9,
   borderRadius:5
  },
  secondInputWrapper:{
    marginLeft:15,
    marginRight:10,
    marginTop: 0,
    marginBottom:3,
    backgroundColor: "rgb(236, 240, 241)",
    //opacity: 0.9,
    borderRadius: 5
  },
  inputSearch:{
    fontSize: 16,
    paddingLeft:10
  }
  });

