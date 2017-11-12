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
import socket from '../server/config'
import DriverStandbyView from './views/DriverStandbyView'
import DriverConfirmRequestView from './views/DriverConfirmRequestView'
import DEnroutetoCusView from './views/DEnroutetoCusView'
const {width, height}= Dimensions.get('window'); 
const SCREEN_HEIGHT = height;
const SCREEEN_WIDTH = width;
const ASPECT_RATIO = width/height;
const LATTITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO;
var watchID = null;
 
export default class DriverHome extends React.Component {
  
  static navigationOptions = {
    title:'',
    header: null
  };


 constructor(props){
 console.log('constructor');
  super(props);
 
this.state={
      d_Name:'Ousman',
      d_Phone:'01123840000',
      region:{
      latitude:3.253502,
      longitude:101.653326,
      latitudeDelta: 0.0022,
      longitudeDelta: 0.0422,
    },
      markerPosition:{
      latitude:3.253502,
      longitude:101.653326,
    },
   tripdetails:{},
   infoText:"You'are online",
   showmap:false, 
   showDconfirm:false
  }
}

componentDidMount(){   
//  Permissions.check('location', 'whenInUse')
     //  .then(response => {
      //   this.setState({ locationPermission: response })
     //  });
   

    // Permissions.request('location', 'whenInUse')
     //  .then(response => {
     //    this.setState({ locationPermission: response })
     //  });
     
     // Alert.alert(
    //  'Your location is turned off?',
    //  'Please turn your location on',
    //  [
      //  {text: 'No', onPress: () => console.log('permission denied'), style: 'cancel'},
      //  this.state.photoPermission == 'undetermined'?
        //  {text: 'OK', onPress: this._requestPermission.bind(this)}
        //  : {text: 'Open Settings', onPress: Permissions.openSettings}
     // ]
   // )

    navigator.geolocation.getCurrentPosition((position) => {
      
      var lat = position.coords.latitude;
      var long = position.coords.longitude;

      var initialRegion={
        latitude: lat,
        longitude: long,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
       };
      
      this.setState({region: initialRegion, markerPosition: initialRegion});
    },
     (error) => alert(JSON.stringify(error)),
   {enableHighAccurracy: false, timeout: 20000, maximuAge: 1000}
    );

    this.watchID  = navigator.geolocation.watchPosition((position) => {

      var lat = position.coords.latitude;
      var long = position.coords.longitude;

      var lastRegion={
       latitude: lat,
       longitude: long,
       latitudeDelta: LATTITUDE_DELTA,
       longitudeDelta: LONGITUDE_DELTA
      };
      this.setState({initialRegion: lastRegion, markerPosition: lastRegion});
  });


}    


componentWillUnmount(){
  navigator.geolocation.clearWatch(this.watchId);
}



componentWillMount(){
  socket.on('triprequest', (data)=>{
   if(data !==null){
    this.setState({
     showDconfirm:true,
     tripdetails: data.data
     });  
        console.log('tripssssss', this.state.tripdetails);
    }
      });


}

componentDidUpdate(){
 // console.log('componentDidUpdate');
//   if(this.mapRef !==null){
//   this.mapRef.fitToSuppliedMarkers(
//         this.state.markerids,
//         false, // not animateds
//       );
// }

}


//function to accept triprequest
respondtoRequest(){
this.setState({
showDconfirm:false,
showmap:true
});
if(this.state.tripdetails.userName !== null){
socket.emit('response', {
    "driverName": this.state.d_Name,
    "driverPhone": this.state.d_Phone,
    "status": 'confirm',
    "location": this.state.region, 
    "CustomerName":this.state.tripdetails.userName
    });
}
console.log(this.state.showDconfirm, this.state.showmap);
}


onPressOnline(){
  this.setState({
    infoText:"You'are online",
    driverStatus:"online"
  });
  console.log("set online");
}


onPressOffline(){
  this.setState({
    infoText:"You'are offline",
    driverStatus:"offline"
  });
  console.log("set offline");
}




render() {

if(this.state.showDconfirm == true){
  return( 
   <DriverConfirmRequestView  pickName={this.state.tripdetails.pickUpAddress} dropoffName={this.state.tripdetails.dropOffAddress}
    onPressConfirm={()=> this.respondtoRequest()} /> 
);
}


else if(this.state.showDconfirm == false && this.state.showmap == true){
  return (
    <DEnroutetoCusView  d_cords={this.state.region}  d_markP={this.state.markerPosition}  c_cords={this.state.tripdetails.location}
    />
    );
}

else
return( 
<DriverStandbyView infoText={this.state.infoText}  onlineBtn={()=>this.onPressOnline()} offlineBtn={()=>this.onPressOffline()} /> 
);

}
}

 socket.on("connect", ()=>{
      console.log('driver connected to server');
    });

module.exports = DriverHome;