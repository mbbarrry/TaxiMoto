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

const BookingRequest=(props)=>(

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
      <Text>{props.originName}</Text>
      </View>
      <Icon name="long-arrow-down"  style={styles.toArrow}/>
      <View style={styles.dropoff} >
      <Text>{props.destinationName}</Text>
      </View>
      <Text style={styles.termsText}>By booking you accept our T&C </Text>
      <Button style={styles.cancelBtn} onPress={props.onPressAction}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
      </Button>

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

     cancelBtn:{
        width:width * 0.9,
        justifyContent: "center",
        alignItems: "center",
        borderRadius:7,
        borderWidth: 1,
        borderColor:"#fff",
        backgroundColor:"transparent"
    },
    cancelBtnText:{
        color: "#fff",
    },

 });   

module.exports= BookingRequest;





// <Text style={styles.text}>Please wait while we find you a driver</Text>
//       <Spinner style={styles.spinner} isVisible size={150} type="Pulse" color="#ffffff"/>
//       <Icon name="map-marker"  style={styles.locationIcon}/>
//      <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center'}}> 
//        <View style={styles.pickup} >
//         <Text>{props.originName}</Text>
//         </View>
//         <Icon name="long-arrow-down"  style={styles.toArrow}/>
//         <View style={styles.dropoff} >
//         <Text>{props.destinationName}</Text>
//         </View>
//          <Text style={styles.termsText}>By booking you accept our T&C </Text>

//          <Button style={styles.btnStyle} >
//           <Text style={styles.btnText}> Cancel </Text>
//          </Button>
//     </View>

// ,
//     spinner: {
//         marginBottom: 50
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
//         height:40,
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
//         height:40,
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

//      btnStyle: {
//         justifyContent:"center",
//         alignItems: 'center',
//         borderRadius: 7,
//         backgroundColor: 'red',
//         height: 45,
//         width: width*0.7,
//         marginTop:20,
//         margin: 10,
//         paddingHorizontal: 10
//       },
//        btnText: {
//         fontSize: 20,
//         color: 'rgb(236, 240, 241)'
//     }