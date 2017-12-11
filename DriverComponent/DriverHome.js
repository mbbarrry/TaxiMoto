import React from 'react';
import {
  AppRegistry,
  Text,
  StyleSheet,
  View,
  Alert,
  NetInfo,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  BackHandler,
  AsyncStorage 
} from 'react-native';
import StarRating from 'react-native-star-rating';
import { Container, Drawer, Header, Content, Form, Item, Input,Icon, Button } from 'native-base';
import MapView from "react-native-maps";
import Permissions from 'react-native-permissions'
import request from '../CustomerComponents/request'
import socket from '../server/config'
import DriverStandby from './views/DriverStandby'
import DriverConfirmRequest from './views/DriverConfirmRequest'
import DriverEnroute from './views/DriverEnroute'
import Payment from './views/Payment'
import RateComplaint from './views/RateComplaint'

const {width, height}= Dimensions.get('window'); 
const SCREEN_HEIGHT = height;
const SCREEEN_WIDTH = width;
const ASPECT_RATIO = width/height;
const LATTITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO;
var watchID = null; 
let driverInfo={};
var interval = null;

socket.on("connect", ()=>{
      console.log('driver connected to server');
    });


AsyncStorage.getItem('user', (error, data)=>{
            if(error){
              console.log('something went wrong', error);
            }
            else{
              var data = JSON.parse(data);
              driverInfo =data;
              console.log('driverInfo', driverInfo);
    }
});


export default class DriverHome extends React.Component {
  
  static navigationOptions = {
    title:'',
    header: null
  };

initialState={
      region:{
      latitude:3.2379,
      longitude:101.6840,
      latitudeDelta: 0.0022,
      longitudeDelta: 0.0422,
    },
      markerPosition:{
      latitude:3.253502,
      longitude:101.653326,
    },
   tripdetails:{},
   pickUpdistance:'',
   PickUpduration:'',
   dropoffdistance:'',
   dropoffduration:'',
   starCount: 0,
   feedbackText:'',
   infoText:"You'are online",
   driverStatus:true,
   showmap:false, 
   showDconfirm:false,
   payment:false,
   Tripcompleted:false,
   pickup:true
  };



constructor(props){
 console.log('constructor');
  super(props);
 
this.state=this.initialState;
console.log(JSON.stringify(new Date()));
}

componentDidMount(){   
 Permissions.check('location', 'whenInUse')
      .then(response => {
        this.setState({ locationPermission: response })
      });
   
    Permissions.request('location', 'whenInUse')
      .then(response => {
        this.setState({ locationPermission: response })
      });
     
     Alert.alert(
     'Turn your location on?',
     'Please turn your location on'
   )



NetInfo.isConnected.fetch().then(isConnected => {

    if(isConnected === 'offline'){
      Alert.alert(
          "Your mobile isn't connected to interenet",
          'turn on your interenet'
        )
    }

    else{
        //  Alert.alert(
        //   "No interenet",
        //   'turn on your interenet'
        // )

  console.log('First, is ' + (isConnected ? 'online' : 'offline'));
    }

});


NetInfo.addEventListener('connectionChange', (isConnected)=>{
  console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
});



   //BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

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
  // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  navigator.geolocation.clearWatch(this.watchId);
}



componentWillMount(){
        if(this.state.driverStatus !== false){
            socket.on('triprequest', (data)=>{
            if(data !==null){
                 this.setState({
                          showDconfirm:true,
                          tripdetails: data.data
                  });  
                 if(this.state.tripdetails !== null){
                   this.getDurationDistanceOfPickup();  
                }
                console.log('trip details', this.state.tripdetails);
           }
      });
    }

  socket.on('tripcanceled', ()=>{
        Alert.alert(
           'Trip canceled',
           'the customer has canceled the trip',
           'stay online to get trips'
         )
    this.setState(this.initialState);
  });


//console.log('name', driverInfo.fullName);

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

//function to get the duration & distance of pickup
getDurationDistanceOfPickup(){
 return request.get("https://maps.googleapis.com/maps/api/distancematrix/json")  
     .query({
        //origin: this.state.origin.latitude + "," + this.state.origin.longitude,
        //destination: this.state.destination.latitude + "," + this.state.destination.longitude,
        origins: this.state.region.latitude + "," + this.state.region.longitude,
        destinations: this.state.tripdetails.CustomerCords.latitude + ","+ this.state.tripdetails.CustomerCords.longitude,
        //destinations: this.state.tripdetails.CustomerCords.latitude + ","+ this.state.tripdetails.CustomerCords.longitude,
        travelMode:"bicycling",
        key:"AIzaSyAMMYiE-JJBJGtUNxzSXtcQPCcLp-cDgKE"
      })
      .finish((error, data)=>{
        try {
          var distanceMatrix = data.body.rows[0].elements[0];
          this.setState({
            pickUpdistance: distanceMatrix.distance.text,
            pickUpduration : distanceMatrix.duration.text
          });
          console.log('results', data);
          console.log('the distance in m', this.state.pickUpdistance);
          console.log('the duration in minutes', this.state.pickUpduration);
          console.log('the object returned',data);
        } catch (e) {
          console.error(e);
          return null;
        }
      });    
}

//function to get the duration & distance of dropoff
getDurationDistanceOfDropoff(){
  //console.log(this.state.tripdetails.DropoffCords);

 this.interval= setInterval(()=>{ 
 return request.get("https://maps.googleapis.com/maps/api/distancematrix/json")  
     .query({
        //origin: this.state.origin.latitude + "," + this.state.origin.longitude,
        //destination: this.state.destination.latitude + "," + this.state.destination.longitude,
        origins: this.state.region.latitude + "," + this.state.region.longitude,
        destinations: this.state.tripdetails.DropoffCords.latitude + ","+ this.state.tripdetails.DropoffCords.longitude,
        travelMode:"bicycling",
        key:"AIzaSyAMMYiE-JJBJGtUNxzSXtcQPCcLp-cDgKE"
      })
      .finish((error, data)=>{
        try {
          var distanceMatrix = data.body.rows[0].elements[0];
          this.setState({
            dropoffdistance: distanceMatrix.distance.text,
            dropoffduration : distanceMatrix.duration.text
          });
          //console.log('results', data);
          //console.log('the distance in m', this.state.dropoffdistance);
          //console.log('the duration in minutes', this.state.dropoffdistance);
          //console.log('the object returned',data);
        } catch (e) {
          console.error(e);
          return null;
        }     
      });  
   }, 5000); 

 if(this.state.dropoffdistance !== null && this.state.dropoffdistance !==null){
        this.setState({pickup:false});
      }
}



//function to accept triprequest
respondtoRequest(){
    if(this.state.tripdetails.userName !== null){
      socket.emit('response', {
        "driverID": driverInfo._id,
        "driverName": driverInfo.fullName,
        "driverPhone": driverInfo.phoneNumber,
        "location": this.state.region, 
        "customerID":this.state.tripdetails.customerID
        });

     this.storetripdetails();
    }

    this.setState({
    showDconfirm:false,
    showmap:true
    });
    //this.sendDriverloation();
    console.log(this.state.showDconfirm, this.state.showmap);

}



//function to save trip details in the database.
storetripdetails(){
     var date= new Date();
    var data={
    driverID: driverInfo._id, 
    driverName:driverInfo.fullName,
    customerID: this.state.tripdetails.customerID,
    customerName: this.state.tripdetails.customerName,
    originAddress: this.state.tripdetails.pickUpAddress,
    destinationAddress:this.state.tripdetails.dropOffAddress,
    fare:this.state.tripdetails.fare,
    paymentMethod:this.state.tripdetails.PaymentMethod,
    datetime: JSON.stringify(new Date())
    };
   
   request.post("http://172.20.10.2:3000/api/trips")
   .send(data)
   .finish((error, res)=>{
    if(error){
      console.log(error);
    }
    else{
      console.log(res);
    }
   });
}



onPressOnline(){
  this.setState({
    infoText:"You'are online",
    driverStatus:true
  });
  console.log("set online");
}


onPressOffline(){
  this.setState({
    infoText:"You'are offline",
    driverStatus:false
  });
  console.log("set offline");
}

//function to handle the ratings
 onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

//function for the payment
onPaid(){
  clearInterval(this.interval);
socket.emit('tripcompleted', {
"customerID":this.state.tripdetails.customerID
});
this.setState({
  payment:false,
  Tripcompleted: true});
}



//function to save ratings in the database
storeFeedbacktodb(){
    var data={
    driverID: driverInfo._id, 
    driverName:driverInfo.fullName,
    customerID: this.state.tripdetails.customerID,
    customerName: this.state.tripdetails.customerName,
    originAddress: this.state.tripdetails.pickUpAddress,
    destinationAddress:this.state.tripdetails.dropOffAddress,
    rate:this.state.starCount,
    message:this.state.feedbackText,
    datetime: JSON.stringify(new Date())
    };  
   request.post("http://172.20.10.2:3000/api/feedbacks")
   .send(data)
   .finish((error, res)=>{
    if(error){
      console.log(error);
    }
    else{
      console.log(res);
    }
   });
   this.setState(this.initialState);
}


tripStarts(){
  socket.emit('driverIshere', {
    "customerID":this.state.tripdetails.customerID
  });
  this.getDurationDistanceOfDropoff()
}




render() {
if(this.state.showDconfirm == true){
  return( 
   <DriverConfirmRequest  
   pickName={this.state.tripdetails.pickUpAddress} 
   dropoffName={this.state.tripdetails.dropOffAddress}
   onPressConfirm={()=> this.respondtoRequest()}   
   onPressDecline={()=> this.setState(this.initialState)}
  /> 
);}

else if(this.state.showmap == true){
  return (
    <DriverEnroute  
    d_coords={this.state.region} 
    d_markP={this.state.markerPosition}  
    c_coords={this.state.tripdetails.CustomerCords} 
    DropoffCords={this.state.tripdetails.DropoffCords}
    customerName={this.state.tripdetails.customerName} 
    customerPhone={this.state.tripdetails.customerPhone}
    pickUpduration={this.state.pickUpduration} 
    pickUpdistance={this.state.pickUpdistance} 
    dropoffduration={this.state.dropoffduration} 
    dropoffdistance={this.state.dropoffdistance}
    onPressStart={()=> this.tripStarts()}
    pickup={this.state.pickup} 
    onPressComplete={()=> this.setState({showmap:false, payment:true})}
    />
    );}


else if(this.state.payment){
  return(
        <Payment 
        onPaid={()=> this.onPaid()}  
        fare={this.state.tripdetails.fare} 
        paymentMethod={this.state.tripdetails.PaymentMethod}
        />
    );}

else if(this.state.Tripcompleted){
  return(
  <RateComplaint 
  starCount={this.state.starCount}  
  onStarRatingPress={this.onStarRatingPress.bind(this)}  
  onChangeText={(text) => this.setState({feedbackText: text})}
  onSubmit={()=> this.storeFeedbacktodb()}
  />
  );}

else
return( 
<DriverStandby 
infoText={this.state.infoText}  
onlineBtn={()=>this.onPressOnline()} 
offlineBtn={()=>this.onPressOffline()}
name={driverInfo.fullName} 
/> 
);
}
}

module.exports = DriverHome;
