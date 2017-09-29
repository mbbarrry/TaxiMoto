import React from 'React';
import {
  View,
  StyleSheet,
  Alert,
  Dimensions
}
from "react-native";

import { Container, Header, Content, Toast, Button, Text, Icon , Left, Right} from 'native-base';

import AppHeader from './appHeader'
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

const {width, height}= Dimensions.get('window'); 

const SCREEN_HEIGHT = height;
const SCREEEN_WIDTH = width;
const ASPECT_RATIO = width/height;
const LATTITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO;

var watchID = null;


export default class MapContainer extends React.Component{

  origin = null;
  destination = null;

constructor (props){
  super(props);
  this.state={
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
      lat:3.253502,
      long:101.653326,
      },
      totalfare:[],
      showToast: false,
      displayReq:false
  };
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
  navigator.geolocation.clearWatch(this.watchId);
}

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
  //console.log('origin and dest',selectedItem);
}

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
       console.log('my fare', this.state.totalfare);
         }
}


gethedestinationLatLong(destlatlong){
//console.log('id', destlatlong.placeID);
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
          console.log('the lat', this.state.destinationcords.lat);
          console.log('long', this.state.destinationcords.long);
        
        } catch (e) {
          console.error(e);
          return null;
        }
      });    
}


// tripinfo(){
  // this.state={
    // visible:false
  // }
// }



render() {
  return(
  <Container>  

{
  this.state.displayReq == false &&
   
   <View style={{flex:1}}>
   <AppHeader />
   <View style={styles.container}>
    <MapView
    style={styles.map}
    region={this.state.region}>
  <MapView.Marker  
    coordinate={this.state.markerPosition}
    pinColor="green"
   />
 
   {
    this.state.destinationcords.length > 0 &&
    <MapView.Marker  
    coordinate={this.state.destinationcords}
    pinColor="red"
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
       <Bookingbtn onPressAction={() => {this.setState({...this.state, displayReq: true})}} />
   }

    </View>
   </View>
    
   ||

     <TripInfo  
     originName={this.origin !== null && this.state.origin.primaryText}
     destinationName={this.destination !== null && this.state.destination.primaryText}
     />

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
    ...StyleSheet.absoluteFillObject
  }
});
