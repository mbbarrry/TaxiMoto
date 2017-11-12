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
import AppHeader from './appHeader'
import Sidebar from './sideBar'
import MapView from "react-native-maps";
import Permissions from 'react-native-permissions'
import TripRequest from './TripRequest'
import socket from '../server/config'
import CustomerInfo from './customerInfo'

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
   tripdetails:null,
   btnText:'Go offline',
   infoText:"You'are online",
   markerids:['marker1', 'marker2'],
   toggle: false,
   driverStatus: null,
   showmap: false,
   displayC_info: false
  },
  this.mapRef = null;
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


}



componentWillUnmount(){
  navigator.geolocation.clearWatch(this.watchId);
}



componentWillMount(){
 if(this.state.driverStatus == null ){
  socket.on('triprequest', (data)=>{
   if(data !==null)
    this.setState({
     tripdetails: data.data
     });  
        console.log('tripssssss', this.state.tripdetails);
      });
}


}

componentDidUpdate(){
 // console.log('componentDidUpdate');
  if(this.mapRef !==null){
  this.mapRef.fitToSuppliedMarkers(
        this.state.markerids,
        false, // not animateds
      );
}

}

closeDrawer = () =>{
    this.drawer._root.close()
  };

  openDrawer = () => {
    this.drawer._root.open()
  };


//function to accept triprequest
respondtoRequest(){
this.setState({
  displayC_info: true
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
 
console.log(this.state.showmap);

}


_onPressOnline(){
  this.setState({
    btnText:'Go online',
    infoText:"You'are online",
    driverStatus:"online"
  });
  console.log("set online");
}


_onPressOffline(){
  this.setState({
    btnText:'Go offline',
    infoText:"You'are offline",
    driverStatus:"offline"
  });
  console.log("set offline");
}




getCurrentlocation(){
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


render() {


if(this.state.tripdetails == null){
return (
<Drawer  
ref={(ref) => { this.drawer = ref;}}
content={<Sidebar/>}
onClose={()=> this.closeDrawer()} 
>

<View style = {styles.container}>
  <AppHeader  openDrawer={this.openDrawer.bind(this)}/>
 <View style = {styles.FtInfoContainer}>
        <Text style = {styles.text }> {this.state.infoText} </Text>
        <Text style={styles.text2}>Stay online to receive incoming trip request</Text>
 </View>
    <View style={styles.btnContainer}>
      <Button  style={styles.buttonStyle} onPress={this._onPressOnline.bind(this)}>
      <Text style={styles.buttonText}>online</Text>
      </Button>

      <Button  style={styles.buttonStyle}  onPress={this._onPressOffline.bind(this)}>
      <Text style={styles.buttonText}>offline</Text>
      </Button>

    </View>
 </View>
</Drawer>
  );}



else{
return (
  <Container> 

{

 this.state.displayC_info == true ? 

<Drawer  
ref={(ref) => { this.drawer = ref;}}
content={<Sidebar/>}
onClose={()=> this.closeDrawer()} 
>
<View style ={{flex:1}}>
  <AppHeader  openDrawer={this.openDrawer.bind(this)}/>
    <View style={styles.container}>
    <CustomerInfo  cName={this.state.tripdetails.customerName} cPhone={this.state.tripdetails.customerPhone}
     onPressAction={()=>{setState({showmap:true})}}
     />

{
    this.state.showmap == true &&
    <MapView
    style={styles.mapContainer}
    region={this.state.region}
    ref={(ref) => { this.mapRef = ref }}>
   <MapView.Marker  
    coordinate={this.state.markerPosition}
    pinColor="green"
    identifier={this.state.markerids[0]}
   />
     <MapView.Marker  
     coordinate={this.state.tripdetails.location}
     pinColor="red"
     identifier={this.state.markerids[1]}
     />
   </MapView>
}
   </View>
 </View>
</Drawer>  

:

<View style={{flex:1}}>
  <TripRequest  pickName={this.state.tripdetails.pickUpAddress} dropoffName={this.state.tripdetails.dropOffAddress}  
  onPressAction={()=> this.respondtoRequest()} />
</View>

}

</Container>
);}



  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'rgba(0, 0, 0, 0.5)'
    },

 FtInfoContainer:{
      top:150,
      alignItems:'center',
      justifyContent:'center',
      position:'absolute',
      height:height*0.4,
      width:width*0.7,
      paddingLeft:10,
      marginLeft:60,
      borderColor: '#fff',
      borderWidth:2,
      borderRadius:500,
      shadowColor: '#000',
      shadowOpacity:0.8,
      shadowRadius:2,
      shadowOffset:{
      height:1,
      width:0
      },
       backgroundColor:'#2c3e50'
  },
  text:{
    fontSize:26,
    color:'white'
  },
  text2:{
    marginTop:10,
     fontSize:13,
    color:'white'
  },
  btnContainer:{
    flexDirection:'row',
    top:440,
    marginLeft:120,
  },
 buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'rgb(39, 174, 96)',
        height: height*0.056,
        width: width*0.19,
        marginLeft: 5,
},

buttonText: {
        alignItems: 'center',
        fontSize: 15,
        color: 'rgb(236, 240, 241)',
        margin: 10,
        fontWeight: 'bold'
    },

  mapContainer:{
    position:'absolute',
    ...StyleSheet.absoluteFillObject
  },

  btncolorchange: {
    borderColor: '#e71636',
},

});

 socket.on("connect", ()=>{
      console.log('driver connected to server');
    });

module.exports = DriverHome;