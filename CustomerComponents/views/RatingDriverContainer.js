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
import AutogrowInput from 'react-native-autogrow-input';
import StarRating from 'react-native-star-rating';
import { Container, Drawer, Header, Content, Form, Input, Button, Picker, InputGroup} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height}= Dimensions.get('window'); 
const RatingDriverContainer=(props)=>(

<View style={styles.container}>
    <View style={{marginTop:100}}>
       <StarRating
        disabled={false}
        maxStars={5}
        starColor='green'
        rating={props.starCount}
        selectedStar={(rating) => {props.onStarRatingPress(rating)}}
      />
    </View>
    <View style={{alignItems:'center', justifyContent:'center', marginTop:30}}>
        <Text>Please write your feedback or complaint to the textbox below</Text>
        <Text>Please make short as you've limited space</Text>
    </View>
    <View>
        <AutogrowInput 
        style={styles.inputWrapper}
        placeholder='Give your feedback or Complaint'
        defaultHeight={20}
        maxHeight={200}
        underlineColorAndroid='transparent'
        keyboardType='default'
        onChangeText={(text)=>{props.onChangeText(text)}}
        value={props.text}
        />
      </View>
      <View style={{alignItems:'center', justifyContent:'center', marginTop: 30}}>
        <Button style={{alignItems:'center', justifyContent:'center', backgroundColor:'rgb(39, 174, 96)', borderRadius:5, width:width*0.5}}>
          <Text style={{color:'white', fontSize:17}}>Submit</Text>
        </Button>
        </View>
    
</View>
)

const styles=StyleSheet.create({
container:{
  flex:1,
  backgroundColor:'#80D8FF',
  alignItems:'center'
},
inputWrapper:{
    backgroundColor:'#FFFFFF',
    opacity: 0.9,
    borderRadius:5,
    width:width*0.9,
    marginLeft:12,
    marginTop:30
  },
});

module.exports= RatingDriverContainer;

