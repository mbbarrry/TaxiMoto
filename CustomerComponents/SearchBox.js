import React from 'react';
import {StyleSheet,Alert } from "react-native";
import { InputGroup, Text, Header, Content, Form, Item, Input, View} from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";
import RNGooglePlaces from "react-native-google-places";



export default class SearchBox extends React.Component {
 
constructor(props){
  super(props);
  this.state={
    pick:'',
    drop:''
  }
}

prediction(){
 RNGooglePlaces.getAutocompletePredictions('')
    .then((results) => this.setState({ predictions: results }))
    .catch((error) => console.log(error.message));
  }
  render() {
    return (
<View style={styles.SearchBox}>

  <View style={styles.inputWrapper}>
  <InputGroup>
      <Icon name="search" size={15} color="#FF5E3A" />
      <Input  style={styles.inputSearch} 
       placeholder="Choose pick-up location"
        onChangeText={this.prediction.bind(this)}
      />
  </InputGroup>  
  </View>   

<View style={styles.secondInputWrapper}>
  <InputGroup>
      <Icon name="search" size={15} color="#FF5E3A" />
      <Input  style={styles.inputSearch} 
      placeholder="Choose drop-off location"
      onChangeText={(text) => this.setState({drop: text})}
      value={this.state.region}
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