import React from 'react';
import {
  StyleSheet, 
  Dimensions, 
  View 
} from "react-native";

import { InputGroup, Text, Header, Content, Form, Item, Input} from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";
const {width, height}= Dimensions.get('window'); 



const SearchboxContainer=(props)=>(

<View style={styles.SearchBox}>
  <View style={styles.inputWrapper}>
  {
    props.originName !== null ?
  <InputGroup>
      <Icon name="search" style={{fontSize:20, color:'green'}} />
      <Input  style={styles.inputSearch} 
       placeholder="Pick-Up Location"
       onChangeText={(text) => {props.handleInputChange(text, 'pick-up')}}
       value={props.originName.primaryText}
       onFocus={() => { props.displayFare(false)}}
       onBlur={() => { props.displayFare(true)}}
      />
  </InputGroup>  

:

 <InputGroup>
      <Icon name="search" style={{fontSize:20, color:'green'}} />
      <Input  style={styles.inputSearch} 
       placeholder="Pick-Up Location"
       onChangeText={(text) => {props.handleInputChange(text, 'pick-up')}}
       onFocus={() => { props.displayFare(false)}}
       onBlur={() => { props.displayFare(true)}}
      />
  </InputGroup>  

}
  </View>   
<View style={styles.secondInputWrapper}>
{
  props.destinationName !==null ? 
  <InputGroup>
      <Icon name="search" style={{fontSize:20, color:'green'}}/>
      <Input  style={styles.inputSearch}  
       placeholder="Drop-Off Location"
       onChangeText={(text) => {props.handleInputChange(text, 'drop-off')}}
       value={props.destinationName.primaryText}
       onFocus={() => { props.displayFare(false) }}
       onBlur={() => { props.displayFare(true) }}
      />
  </InputGroup>   

:

 <InputGroup>
      <Icon name="search" style={{fontSize:20, color:'green'}}/>
      <Input  style={styles.inputSearch}  
       placeholder="Drop-Off Location"
       onChangeText={(text) => {props.handleInputChange(text, 'drop-off')}}
       onFocus={() => { props.displayFare(false) }}
       onBlur={() => { props.displayFare(true) }}
      />
  </InputGroup>  


 }

  </View>   
</View>

)



const styles= StyleSheet.create({
  SearchBox:{
    top:10,
    position:"absolute",
    width:width*0.9,
    //height:height*0.1,
    backgroundColor: '#fff',
    height:140,
    opacity:0.8,
    marginLeft:16
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



module.exports= SearchboxContainer;