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

import StarRating from 'react-native-star-rating';
import { Container, Drawer, Header, Content, Form, Item, Input, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from "react-native-maps";
import Permissions from 'react-native-permissions'
const {width, height}= Dimensions.get('window'); 

const TrackDriver=(props)=>(
<View style={styles.container}>
   <MapView
        style={styles.map}
        region={props.c_coords}
        provider="google"
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        followsUserLocation={true}
        loadingEnabled={true}
        toolbarEnabled={true}
        zoomEnabled={true}
        rotateEnabled={true}
      >
        <MapView.Marker
          coordinate={props.c_markP}
          pinColor="green"
        />  

        <MapView.Marker
          coordinate={props.c_coords}
          pinColor="red"
        />

      </MapView>     

<View style={styles.footerContainer}>
      <View style={{flexDirection:'row', marginTop:10}}>
      <Text style={{fontSize:16, color:'black', marginLeft:10}} >Driver is 2.3 km away</Text>
      <Text style={{fontSize:16, color:'red', marginLeft:190}}>1.0 min</Text>
      </View>
      <View style={styles.DriverInfo}>
        <Icon name="user" size={30} style={{marginLeft:20, marginTop:20}}/>
        <View style={{flexDirection:'column'}}>
        <Text style={{marginLeft:40, fontSize:16, color:'#212121', marginTop:10}}> Mamadou </Text>
       <View style={{marginLeft:40, marginTop:10, width:50}}>
        <StarRating 
          disabled={true}
          maxStars={5}
          rating={2.5}
          starColor='green'
          starSize={20}
        />
        </View>
        <View style={{flexDirection:'row', marginLeft:225, marginTop:8}}>
        <Icon name="phone" size={20} />
        <Text style={{fontSize:15, color:'#212121', paddingLeft:10}}>01545584775</Text>     
        </View>
        </View>
      </View>
     </View> 

</View>    

)
  
const styles= StyleSheet.create({
container:{
  flex:1
},
map:{
  ...StyleSheet.absoluteFillObject
},
footerContainer:{
  top:450,
    width:width,
    backgroundColor: 'white',
    height:height*0.25,
    opacity:15
},
DriverInfo:{
marginTop:20,
flexDirection:'row',
width:width,
borderRadius:4,
backgroundColor:'#E0E0E0',
height:height*0.15
}

});

module.exports= TrackDriver;





// <Button style={{alignItems:'center', justifyContent:'center', marginLeft:17, marginTop:20, backgroundColor:'rgb(39, 174, 96)', borderRadius:5, width:width*0.9}}>
//       <Text style={{color:'rgb(236, 240, 241)', fontSize:20, fontWeight:'bold'}}>START TRIP</Text>
//       </Button> 

//<Text style={{marginLeft:20, marginTop:5, fontSize:15, fontWeight:'bold', color:'rgb(39, 174, 96)'}}> PICK UP </Text>
//<Text style={{marginLeft:150, marginTop:20, fontSize:15}}>{props.duration}</Text>     



 