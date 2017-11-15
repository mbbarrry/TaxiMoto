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
import MapView from "react-native-maps";
import Permissions from 'react-native-permissions'
const {width, height}= Dimensions.get('window'); 

const MapContainer=(props)=>(
<View style={styles.map}>
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
      { props.c_markP  &&
      <MapView.Marker
          coordinate={props.c_markP}
          pinColor="green"
       />
       }  
   </MapView>
</View>

)

const styles=StyleSheet.create({
 container:{
		flex:1
	},
 map:{
  position:'absolute',
  ...StyleSheet.absoluteFillObject
 }
});

module.exports= MapContainer;