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
  TouchableWithoutFeedback
} from 'react-native';

import { Container, Drawer, Header, Content, Form, Item, Input,Icon, Button } from 'native-base';
import MapView from "react-native-maps";
import Permissions from 'react-native-permissions'
const {width, height}= Dimensions.get('window'); 


const DEnroutetoCusView =(props) =>(

 <View style={styles.container}>
      <MapView
      	style={styles.map}
      	region={props.d_cords}
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
      		coordinate={props.d_markP}
      		pinColor="green"
      	/>	

      	<MapView.Marker
      		coordinate={props.c_cords}
      		pinColor="red"
      	/>
      </MapView>

</View>   
 
)


const styles= StyleSheet.create({
container:{
	flex:1
},
map:{
	...StyleSheet.absoluteFillObject
}

});

module.exports= DEnroutetoCusView;