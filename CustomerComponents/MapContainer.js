import React from 'React';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Dimensions,
}
from "react-native";
import MapView from "react-native-maps";
import SearchBox from "./SearchBox"
import Permissions from 'react-native-permissions'

const {width, height}= Dimensions.get('window') 

const SCREEN_HEIGHT = height
const SCREEEN_WIDTH = width
const ASPECT_RATIO = width/height
const LATTITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO


export default class MapContainer extends React.Component{


constructor (props){
  super(props);
  this.state={
    region:{
      latitude:3.253502,
      longitude:101.653326,
       latitudeDelta: 0.0022,
      longitudeDelta: 0.0422,
    },
    markerPosition:{
      latitude:3.253502,
      longitude:101.653326,
    }
  };
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
      'Your location is turned off?',
      'Please turn your location on',
      [
        {text: 'No', onPress: () => console.log('permission denied'), style: 'cancel'},
        this.state.photoPermission == 'undetermined'?
          {text: 'OK', onPress: this._requestPermission.bind(this)}
          : {text: 'Open Settings', onPress: Permissions.openSettings}
      ]
    )


    navigator.geolocation.getCurrentPosition((position) => {
      
      var lat = position.coords.latitude;
      var long = position.coords.longitude;

      var initialRegion={
        latitude: lat,
        longitude: long,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      };
      
      this.setState({region: initialRegion});
      this.setState({markerPosition: initialRegion});
    },
     (error) => alert(JSON.stringify(error)),
    {enableHighAccurracy: true, timeout: 20000, maximuAge: 1000}
    );

   // this.watchID  = navigator.geolocation.wacthPosition((position) => {

   //   var lat = position.coords.latitude;
     // var long = position.coords.longitude;

     // var lastRegion={
       // latitude: lat,
       // longitude: long,
       // latitudeDelta: LATTITUDE_DELTA,
        //longitudeDelta: LONGITUDE_DELTA
      //};
      
      //this.setState({initialRegion: lastRegion});
      //this.setState({markerPosition: lastRegion});
  //  });

//}

//componentWillUnmount(){
  //navigator.geolocation.clearWatch(this.wacthId);
}

render() {
  return(
   <View style={styles.container}>
    <MapView
    style={styles.map}
    region={this.state.region}>
  
  <MapView.Marker  
    coordinate={this.state.markerPosition}
    pinColor="green"
   />
</MapView>
    <SearchBox />
    </View>
  );
}
}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 660,
    width: 500,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
