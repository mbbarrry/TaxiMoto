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
  Dimensions
} from 'react-native';

import { Container, Drawer, Header, Content, Form, Item, Input,Icon, Button } from 'native-base';
import AppHeader from './appHeader'
import Sidebar from './sideBar'
import TripRequest from './TripRequest'
import socket from '../server/config'


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
 constructor(props) {
 console.log('constructor');
  super(props);
console.ignoredYellowBox = [
    'Setting a timer'
]
 
this.state= {
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
    tripdetails:null
  }

}


componentDidMount(){
  console.log('componentDidMount');

 
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
    {enableHighAccurracy: true, timeout: 20000, maximuAge: 1000}
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
  console.log('componentWillUnmount');
  navigator.geolocation.clearWatch(this.watchId);
}



componentWillMount(){
 
  socket.on('triprequest', (data)=>{
   if(data !==null)
    this.setState({
     tripdetails: data.data
     });  
        console.log('tripssssss', this.state.tripdetails);
      });

}


componentDidUpdate(){
  console.log('componentDidUpdate');

}


closeDrawer = () =>{
    this.drawer._root.close()
  };

  openDrawer = () => {
    this.drawer._root.open()
  };


//function to accept triprequest
respondtoRequest(){
if(this.state.tripdetails.userName !== null){
socket.emit('response', {
    "DriverName": "Ousman",
    "status": 'confirm',
    "location": this.state.region, 
    "CustomerName":this.state.tripdetails.userName
    });


Alert.alert(
  'Customer Info',
  'Name: BArrry',
  [
    {text: 'OK', onPress: () => console.log('OK Pressed')}
  ],
  { cancelable: false }
)

}

// setTimeout(function(){
//   console.log('reset')
// this.setState({
//   tripdetails: null
// });
//  },2000);
 
}



componentShouldRender () {
  console.log('componentShouldRender');
  return true;
}


render() {

if(this.state.tripdetails ==null){
return (

<Drawer  
ref={(ref) => { this.drawer = ref;}}
content={<Sidebar/>}
onClose={()=> this.closeDrawer()} 
>

<View style = {styles.container}>
 <AppHeader  openDrawer={this.openDrawer.bind(this)}/>
 </View>
</Drawer>
  );
}
else
return (
     <View style={{flex:1}}>
       <TripRequest  pickName={this.state.tripdetails.pickUpAddress} dropoffName={this.state.tripdetails.dropOffAddress}  
       onPressAction={()=> {this.respondtoRequest()}}
        />
     </View>
  );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
  });

 socket.on("connect", ()=>{
      console.log('driver connected to server');
    });

module.exports = DriverHome;