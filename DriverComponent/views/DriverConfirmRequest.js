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

import { Container, Drawer, Header, Content, Form, Item, Input, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height}= Dimensions.get('window'); 
var Spinner = require("react-native-spinkit");

const DriverConfirmRequest=(props)=>(

<View style={styles.container}>
    <View style={{top:70, justifyContent:'center', alignItems:'center' }}>
    <Text style={{color:'white', fontSize:17}}>Processing your request</Text>
    <Icon name="map-marker"  style={styles.locationIcon}/>
    </View>
  <View  style={{top:120, justifyContent:'center', alignItems:'center'}}>
  <Spinner isVisible={props.isVisible} size={150} type="Pulse" color='white'/>
  </View>      
  <View style={{top:170, justifyContent:'center', alignItems:'center'}}>
      <View style={styles.pickup} >
      <Text>{props.pickName}</Text>
      </View>
      <Icon name="long-arrow-down"  style={styles.toArrow}/>
      <View style={styles.dropoff} >
      <Text>{props.dropoffName}</Text>
      </View>
      <Text style={styles.termsText}>By confirming you accept our T&C </Text>
        <View style={{flex:1, flexDirection:'row'}}>
         <Button style={styles.btnStyle1}  onPress={props.onPressConfirm}>
          <Text style={styles.btnText}> Confirm </Text>
         </Button>
         <Button style={styles.btnStyle2}  onPress={props.onPressDecline}>
          <Text style={styles.btnText}> Decline</Text>
         </Button>
         </View>

   </View>
 </View>   

)

const styles= StyleSheet.create({
 container:{ 
          flex: 1,
          backgroundColor:'rgb(52, 73, 94)',
          //justifyContent:'center',
          alignItems:'center'
    },
 locationIcon:{
         color: "#fff",
         fontSize: 40,
         marginTop:15
    },
  pickup:{
  width:width * 0.9,
        borderRadius:7,
        height:40,
        backgroundColor:"#fff",
        // marginTop:260,
        justifyContent: "center",
        alignItems: "center"
},
 dropoff:{
        width:width * 0.9,
        borderRadius:7,
        height:40,
        backgroundColor:"#fff",
        marginTop:10,
        justifyContent: "center",
        alignItems: "center"

},

 toArrow:{
        color:"#fff",
        fontSize:16,
        marginTop:10,
    },
    termsText:{
        color:"#fff",
        textAlign:"center",
        fontSize:14,
        marginBottom:15

    },

     btnStyle1: {
        justifyContent:"center",
        alignItems: 'center',
        borderRadius: 7,
        backgroundColor: 'green',
        height: 45,
        width: width*0.4,
        marginTop:20,
        margin: 10,
        paddingHorizontal: 10
      },

btnStyle2: {
        justifyContent:"center",
        alignItems: 'center',
        borderRadius: 7,
        backgroundColor: 'red',
        height: 45,
        width: width*0.4,
        marginTop:20,
        margin: 10,
        paddingHorizontal: 10
      },
  btnText:{
    color:'white',
    fontSize:16
  }    

 });   

module.exports = DriverConfirmRequest;














// import React from 'react';
// import {StyleSheet, View, Alert, Text, StatusBar, Dimensions } from "react-native";
// import {Button, Toast} from 'native-base';
// import Icon from "react-native-vector-icons/FontAwesome";

// const { width } = Dimensions.get("window");
// var Spinner = require("react-native-spinkit");

// const DriverConfirmRequest =(props) =>(

//  <View style={styles.container}>
//       <Text style={styles.text}>W've got you customer!</Text>
//       <Icon name="map-marker"  style={styles.locationIcon}/>
// <View  style={{top:120, justifyContent:'center', alignItems:'center'}}>
//   <Spinner isVisible={props.isVisible} size={150} type="Pulse" color='white'/>
//   </View>   
      
//      <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center'}}> 
//        <View style={styles.pickup} >
//         <Text>{props.pickName}</Text>
//         </View>
//         <Icon name="long-arrow-down"  style={styles.toArrow}/>
//         <View style={styles.dropoff} >
//         <Text>{props.dropoffName}</Text>
//         </View>
//          <Text style={styles.termsText}>By confirming you accept our T&C </Text>
//          <View style={{flex:1, flexDirection:'row'}}>
//          <Button style={styles.btnStyle1}  onPress={props.onPressConfirm}>
//           <Text style={styles.btnText}> Confirm </Text>
//          </Button>
//          <Button style={styles.btnStyle2}  onPress={props.onPressDecline}>
//           <Text style={styles.btnText}> Decline</Text>
//          </Button>
//          </View>
//     </View>        
// </View>   
 
// )

// const styles= StyleSheet.create({
//     container:{ 
//     flex: 1,
//     backgroundColor:'rgb(52, 73, 94)',
//     justifyContent:'center',
//     alignItems:'center'
//     },
    
//      text: {
//         color: "white",
//         fontSize:17,
//         marginBottom:15,
//         marginTop:20
//     },

//      locationIcon:{
//         color: "#fff",
//         fontSize: 40,
//         marginTop:15
//     },
    
//     pickup:{
//         width:width * 0.7,
//         borderRadius:7,
//         height:45,
//         backgroundColor:"#fff",
//         marginTop:260,
//         justifyContent: "center",
//         alignItems: "center"
//     },
     
//      toArrow:{
//         color:"#fff",
//         fontSize:20,
//         marginTop:10,
//     },
    
//      dropoff:{
//         width:width * 0.7,
//         borderRadius:7,
//         height:45,
//         backgroundColor:"#fff",
//         marginTop:10,
//         justifyContent: "center",
//         alignItems: "center"
//     },

//      termsText:{
//         color:"#fff",
//         textAlign:"center",
//         fontSize:16,
//         marginTop:15
//     },

//      btnStyle1: {
//         justifyContent:"center",
//         alignItems: 'center',
//         borderRadius: 7,
//         backgroundColor: 'green',
//         height: 45,
//         width: width*0.4,
//         marginTop:20,
//         margin: 10,
//         paddingHorizontal: 10
//       },

// btnStyle2: {
//         justifyContent:"center",
//         alignItems: 'center',
//         borderRadius: 7,
//         backgroundColor: 'red',
//         height: 45,
//         width: width*0.4,
//         marginTop:20,
//         margin: 10,
//         paddingHorizontal: 10
//       },



//        btnText: {
//         fontSize: 20,
//         color: 'rgb(236, 240, 241)'
//     },

//   });