import React from 'React';
import {
  View,
  StyleSheet,
  Alert,
  Dimensions
}
from "react-native";
import ws from '../server/serverConfig'
import { Container, Drawer, Header, Content, Toast, Button, Text, Icon , Left, Right} from 'native-base';
import AppHeader from './appHeader'
import Sidebar from './sideBar'
import MapView from "react-native-maps";
import SearchBox from "./SearchBox"
import Permissions from 'react-native-permissions'
import RNGooglePlaces from 'react-native-google-places'
import SearchResults from './SearchResults'
import request from './request'
import calculateFare from './fareCalculator'
import Book from './Book'
import Bookingbtn from './Bookingbtn'
import TripInfo from './TripInfo'
import DriverInfo from './driverInfo'

const {width, height}= Dimensions.get('window'); 

const SCREEN_HEIGHT = height;
const SCREEEN_WIDTH = width;
const ASPECT_RATIO = width/height;
const LATTITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO;

var watchID = null;



//let prevState = null;

let driver_info=null;

export default class MapContainer extends React.Component{

  static navigationOptions = {
    title:'',
    header: null
  };


  origin = null;
  destination = null;

constructor (props){
 // console.log('constructor');
  super(props);

  // ws.emit('customer:connected', {
  //     "userName": "barry",
  // });
  

  this.state= {
      c_Name:'Barry',
      c_Phone:'0112383883',
      visible: true,
    predictions:[],
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
      origin:{} ,
      destination:{},
      distance:{},

      dummyNumbers:{
        baseFare:0.4,
        timeRate:0.14,
        distanceRate:0.97,
        surge:1
      },
      
      destinationcords:{
      lat:null,
      long:null,
      },
      totalfare:[],
      showToast: false,
      displayReq:false,
      markerids:['marker1', 'marker2'],
      status: null,
      displayInfo: false,
      isMapReady: false,
   },
     this.mapRef = null;
     //console.log('prevState', prevState);

  console.ignoredYellowBox = [
      'Setting a timer'
  ]
console.log(this.state.c_Name, this.state.c_Phone);

}

componentDidMount(){

// this.setState({status: 'pending' });
    
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
  //console.log('componentWillUnmount');
  navigator.geolocation.clearWatch(this.watchId);

 // prevState = this.state;
}


componentWillMount(){

}


//function to get the google places predictions

displayPredictions(text, type){
  RNGooglePlaces.getAutocompletePredictions(text)
    .then((results) => {
      this.setState({ 
        predictions: results, 
        predictionsType: type 
      });
    })
    .catch((error) => console.log(error.message));

  // console.log('predictions', this.state.predictions);
}


//function to get the selected item from google places prediction

selectedAddress(selectedItem){
  const predictionType = this.state.predictionsType;

if (predictionType == 'pick-up') {
    this.origin = selectedItem; 
  }

  if (predictionType == 'drop-off') {
    this.destination = selectedItem; 
  }


  if (this.destination !== null && this.origin !== null) {
     this.getDistanceMatrix(this.origin, this.destination);
     this.gethedestinationLatLong(selectedItem);
  }

  this.setState({
    predictions: [],
    origin:this.origin,
    destination:this.destination,
  });
 // console.log('origin and dest',selectedItem);
  //console.log('des...', this.destination);
}



//function to get the distance using google distancematrix

getDistanceMatrix(origin, destination){
  // console.log('o:d', origin, destination);
     return request.get("https://maps.googleapis.com/maps/api/distancematrix/json")  
     .query({
        //origin: this.state.origin.latitude + "," + this.state.origin.longitude,
        //destination: this.state.destination.latitude + "," + this.state.destination.longitude,
        origins: ['place_id:' + origin.placeID],
        destinations: ['place_id:' + destination.placeID],
        travelMode:"bicycling",
        key:"AIzaSyAMMYiE-JJBJGtUNxzSXtcQPCcLp-cDgKE"
      })
      .finish((error, data)=>{
        try {
          var distanceMatrix = data.body.rows[0].elements[0];
          this.setState({
            distance: distanceMatrix.distance.value,
            duration : distanceMatrix.duration.value
          });
          //console.log('the distance', this.state.distance);
          //console.log('the duration', this.state.duration);
          this.gettheFare(this.state.distance, this.state.duration );
        } catch (e) {
          console.error(e);
          return null;
        }
      });    
}

//function to calculate the fare  

gettheFare(distance, duration){
    if (distance !==null) {
       const fare= calculateFare(
            this.state.dummyNumbers.baseFare,
            this.state.dummyNumbers.timeRate,
            duration,
            this.state.dummyNumbers.distanceRate,
            distance,
            this.state.dummyNumbers.surge,
          );
       this.setState({
            totalfare: [fare]
         });
     //  console.log('my fare', this.state.totalfare[0]);
    }
}


//function to get the latlong of the destination

gethedestinationLatLong(destlatlong){
//console.log('id', destlatlong);
RNGooglePlaces.lookUpPlaceByID(destlatlong.placeID)
.then((results) =>{
        try {
          var coordinate = results;
          this.setState({
            destinationcords:{
            lat: coordinate.latitude,
            long : coordinate.longitude
          }
          });
        //  console.log("any", coordinate);
          //console.log('the lat', this.state.destinationcords.lat);
          //console.log('long', this.state.destinationcords.long);
        
        } catch (e) {
          console.error(e);
          return null;
        }
      });    
}


//function to fit  the map the supplied markers 

componentDidUpdate(){
 // console.log('componentDidUpdate');
  if(this.mapRef !==null){
  this.mapRef.fitToSuppliedMarkers(
        this.state.markerids,
        false, // not animateds
      );
}

}


componentWillMount(){
  // console.log('componentWillMount');
ws.on('request accepted', (data)=>{
  if(data !== null)  
  var driver_info= data;
     console.log('response', driver_info);
this.setState({displayInfo: true});
console.log(this.state.displayInfo);
});

}


//function to send request to driver

requestDriver(){
this.setState({status: 'pending' });
ws.emit('request', {
    "customerName": this.state.c_Name,
    "customerPhone": this.state.c_Phone,
    "location":this.state.markerPosition,
    "pickUpAddress": this.state.origin.primaryText,
    "dropOffAddress": this.state.destination.primaryText ,
    "fare": this.state.totalfare[0],
    "status": 'pending'
});

// setTimeout(function(){
// this.changestate();
// },3000);
}


//function to close drawer
closeDrawer = () =>{
    this.drawer._root.close()
  };

//function to open drawer
  openDrawer = () => {
    this.drawer._root.open()
  };

 onMapLayout = () => {
    this.setState({ isMapReady: true });
  }


render() {
  return(
<Container>  
{
  
  this.state.status == 'pending' ? <TripInfo  
     originName={ this.state.origin.primaryText }
     destinationName={ this.state.destination.primaryText}/> :

<Drawer  
ref={(ref) => { this.drawer = ref;}}
content={<Sidebar/>}
onClose={()=> this.closeDrawer()} 
>
   <View style={{flex:1}}>
   <AppHeader openDrawer={this.openDrawer.bind(this)}/>
   <View style={styles.container}>
    
{
    this.state.displayInfo == true  ?

    <DriverInfo dName={this.state.driver_info.driverName} dPhone={this.state.driver_info.driverPhone} 
    />   
    
    :
    <View style={styles.map}>
    <MapView
     style={styles.map}
     region={this.state.region}
     onLayout={this.onMapLayout}
     ref={(ref) => { this.mapRef = ref }}>
{
   this.state.isMapReady &&
   <MapView.Marker  
    coordinate={this.state.markerPosition}
    pinColor="green"
    identifier={this.state.markerids[0]}
   />
    <MapView.Marker  
    coordinate={{latitude: this.state.destinationcords.lat, longitude: this.state.destinationcords.long}}
    pinColor="red"
    identifier={this.state.markerids[1]}
    />
   
}
   </MapView>
    <SearchBox handleInputChange={this.displayPredictions.bind(this)}  
    originName={this.origin !== null && this.state.origin.primaryText}
    destinationName={this.destination !== null && this.state.destination.primaryText}
    displayFare={(displayFare) => {this.setState({...this.state, displayFare: displayFare})}}
    />
   
    { 
      this.state.predictions.length > 0 && 
      <SearchResults predictions={this.state.predictions} handleSelectedItem={this.selectedAddress.bind(this)}  /> 
    }
    

    {
      this.state.displayFare && this.state.totalfare.length > 0 && <Book thefare={this.state.totalfare} />
      
    }
   
   {

       this.state.displayFare && this.state.totalfare.length > 0  &&  
       <Bookingbtn onPressAction={()=> {this.requestDriver()}} />
   }

   </View>
}

    </View>
   </View>
   </Drawer> 
}

</Container>

);
}
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  map: {
    position:'absolute',
    ...StyleSheet.absoluteFillObject
  }
});


ws.on("connect", ()=>{
      console.log('customer connected to server');  
});

module.exports = MapContainer;
