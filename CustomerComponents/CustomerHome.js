import React from 'React';
import {
  View,
  StyleSheet,
  Alert,
  Dimensions,
  AsyncStorage,
  NetInfo 
}
from "react-native";
import StarRating from 'react-native-star-rating';
import ws from '../server/serverConfig'
import { Container, Drawer, Header, Content, Toast, Button, Text, Icon , Left, Right, Picker} from 'native-base';
import AppHeader from './appHeader'
import Sidebar from '../CustomerComponents/drawer/sideBar'
import Permissions from 'react-native-permissions'
import RNGooglePlaces from 'react-native-google-places'
import request from './request'
import calculateFare from './fareCalculator'
import MapContainer from './views/MapContainer'
import SearchboxContainer from './views/SearchboxContainer'
import Autoplacesuggestion from './views/Autoplacesuggestion'
import BookingContainer from './views/BookingContainer'
import BookingRequest from './views/BookingRequest'
import TrackDriver from './views/TrackDriver'
import RatingDriverContainer from './views/RatingDriverContainer'


const {width, height}= Dimensions.get('window'); 

const SCREEN_HEIGHT = height;
const SCREEEN_WIDTH = width;
const ASPECT_RATIO = width/height;
const LATTITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO;

var watchID = null;
var interval = null;
let customerInfo={};


ws.on("connect", ()=>{
      console.log('customer connected to server');  
});

AsyncStorage.getItem('user', (error, data)=>{
            if(error){
              console.log('something went wrong', error);
            }
            else{
                var data = JSON.parse(data);
                customerInfo= data;
                console.log('customerInfo',customerInfo);
    }
});



export default class CustomerHome extends React.Component{

  static navigationOptions = {
    title:'',
    header: null
  };


  origin = null;
  destination = null;

 initialState = { 
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
    predictions:[],
    destination:{},
    distance:{},
    duration:{},
    dummyNumbers:{
    baseFare:0.4,
    timeRate:0.14,
    distanceRate:0.97,
    surge:1
    },

    destinationcords:{
    latitude:null,
    longitude:null,
    },
    
    totalfare:[],
    showToast: false,
    displayReq:false,
    markerids:['marker1', 'marker2', 'marker2'],
    status:null,
    selected: "cash",
    starCount: 0,
    feedbackText:'',
    findDriver:false,
    isVisible: true,
    TrackDriver:false,
    Tripcompleted:false,
    driverDetails:{},
    pickUpduration:'',
    pickUpdistance:'',
    dropoffdistance:'',
    dropoffduration:'',
    trackdriver:{},
    pickup: true
};

constructor (props){
  super(props);
//console.log(props);
  this.state = this.initialState
       
   // once everything done, reset state
   // this.setState(this.initialState)
    
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
  //console.log('First, is ' + (isConnected ? 'online' : 'offline'));
    }

});


NetInfo.addEventListener('connectionChange', (isConnected)=>{
    if(isConnected === 'offline'){
      Alert.alert(
          "Your mobile isn't connected to interenet",
          'turn on your interenet'
        )
    }
    else{
  console.log('Then, is ' + (isConnected ? 'online' : 'offline')); 
       }
});


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


//function to get the google places predictions
displayPredictions(text, type){
  RNGooglePlaces.getAutocompletePredictions(text, {country: "MY"})
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
         // console.log('the object returned',data);
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
                //var coordinate = results
                this.setState({
                  destinationcords:{
                  latitude: results.latitude,
                  longitude: results.longitude
                }
                });
              //  console.log("any", coordinate);
                //console.log('the cord i want ', results)
                //console.log('the lat', this.state.destinationcords.latitude);
                //console.log('long', this.state.destinationcords.longitude);
                //console.log('the destination coords', this.state.destinationcords);
              } catch (e) {
                console.error(e);
                return null;
              }
      });    
}



componentWillMount(){
      ws.on('request accepted', (data)=>{
          if(customerInfo._id === data.customerID){
            if(data !== null){
            this.setState({
            driverDetails:data,
            findDriver:false,
            TrackDriver:true
            });
        // console.log('driver details from server', data);
          //console.log('driver data', this.state.driverDetails);
          this.getDistanceFromDriver();  
        }
      }  
});


// ws.on('trackdriver', (data)=>{
//     console.log('driverLocation sent by server',data);
//     this.setState({trackdriver: data});
//     console.log('driver location', this.state.trackdriver);
// });

    ws.on('givefeeback', (data)=>{
          if(customerInfo._id === data.customerID){
            Alert.alert(
           'Reached destination',
           "You're at your destionation don't forget to rate the trip, thank you for choosing to ride with us"  
         )
          clearInterval(this.interval);     
          this.setState({
          TrackDriver:false,
          Tripcompleted: true});
        }  
    });


ws.on('driverArrived at pic', (data)=>{
      if(customerInfo._id === data.customerID){

        Alert.alert(
          "Driver is here",
          'Prepare for your journey!'
        )

        this.getDistanceDurationOfDropoff();
        this.setState({pickup:false});
      }
});

}



//function to send request to driver
findDriver(){
      this.setState({
        findDriver: true 
      });
      ws.emit('request', {
          "customerID": customerInfo._id,
          "customerName": customerInfo.fullName,
          "customerPhone": customerInfo.phoneNumber,
          "pickUpAddress": this.state.origin.primaryText,
          "dropOffAddress": this.state.destination.primaryText,
          "CustomerCords": this.state.region,
          "DropoffCords":this.state.destinationcords,
          "fare": this.state.totalfare[0],
          "PaymentMethod":this.state.selected
      });
}

// setTimeout(function(){
// this.changestate();
// },3000);

//function to cancel request 
onCancelfindDriver(){
      const data='customer canceled trip';
      ws.emit('cancel');
      this.setState(this.initialState);
}


//function to handle the selected
onValueChange(value: string) {
        this.setState({
          selected: value
        });
}

//function to close drawer
closeDrawer = () =>{
    this.drawer._root.close()
};

//function to open drawer
openDrawer = () => {
    this.drawer._root.open()
};

//function to handle the ratings
onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
}


//function to get the duration & distance of pickup
getDistanceFromDriver(){ 
 return request.get("https://maps.googleapis.com/maps/api/distancematrix/json")  
     .query({
        //origin: this.state.origin.latitude + "," + this.state.origin.longitude,
        //destination: this.state.destination.latitude + "," + this.state.destination.longitude,
        origins: this.state.region.latitude + "," + this.state.region.longitude,
        destinations: this.state.driverDetails.location.latitude + ","+ this.state.driverDetails.location.longitude,
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
          //console.log('results', data);
          //console.log('the distance in m', this.state.distance);
          //console.log('the duration in minutes', this.state.duration);
          //console.log('the object returned',data);
        } catch (e) {
          //console.error(e);
          return null;
        }
      });    
}



getDistanceDurationOfDropoff(){ 

 this.interval = setInterval(()=>{
  console.log('current dropoffdistance from driver');
 return request.get("https://maps.googleapis.com/maps/api/distancematrix/json")  
     .query({
        //origin: this.state.origin.latitude + "," + this.state.origin.longitude,
        //destination: this.state.destination.latitude + "," + this.state.destination.longitude,
        origins: this.state.region.latitude + "," + this.state.region.longitude,
        destinations: this.state.destinationcords.latitude + ","+ this.state.destinationcords.longitude,
        travelMode:"bicycling",
        key:"AIzaSyAMMYiE-JJBJGtUNxzSXtcQPCcLp-cDgKE"
      })
      .finish((error, data)=>{
        try {
          var distanceMatrix = data.body.rows[0].elements[0];
          this.setState({
            dropoffdistance: distanceMatrix.distance.text,
            dropoffduration: distanceMatrix.duration.text
          });
          //console.log('results', data);
          //console.log('the distance in m', this.state.distance);
          //console.log('the duration in minutes', this.state.duration);
          //console.log('the object returned',data);
        } catch (e) {
          //console.error(e);
          return null;
        }
      }); 

      }, 5000);   


}



//function to save feeds to database 
saveFeedbacks(){
        var data={
          customerID: customerInfo._id,
          customerName: customerInfo.fullName,
          driverID: this.state.driverDetails.driverID, 
          driverName:this.state.driverDetails.driverName,
          originAddress: this.state.origin.primaryText,
          destinationAddress:this.state.destination.primaryText,
          rate:this.state.starCount,
          message:this.state.feedbackText,
          datetime: JSON.stringify(new Date())
        }

        request.post('http://172.20.10.2:3000/api/feedbacks')
        .send(data)
        .finish((error,res)=>{
          if(error){
            console.log(error);
          }
          else{
            console.log(res);
            }
        });
      this.setState(this.initialState);
}



render(){
 
      if(this.state.findDriver == true){
      return(
        <BookingRequest  
          isVisible={this.state.isVisible} 
          originName={ this.state.origin.primaryText } 
          destinationName={ this.state.destination.primaryText} 
          onPressAction={()=>{this.onCancelfindDriver()}}
        />
        );}

      else if(this.state.TrackDriver == true){
      return(
        <View style={{flex:1}}>        
         <TrackDriver 
         customerlocation={this.state.region} 
         customermarker={this.state.markerPosition} 
         destinationCoordinates={this.state.destinationcords}
         pickUpdistance={this.state.pickUpdistance} 
         pickUpduration={this.state.pickUpduration} 
         driverName={this.state.driverDetails.driverName}  
         driverPhone={this.state.driverDetails.driverPhone}   
         driverLocation={this.state.driverDetails.location}
         markers={this.state.markerids}
         pickup={this.state.pickup}
         dropoffduration={this.state.dropoffduration}
         dropoffdistance={this.state.dropoffdistance}
         />   
        </View>
      );}

      else if(this.state.Tripcompleted){
        return(
          <RatingDriverContainer  
          starCount={this.state.starCount}  
          onStarRatingPress={this.onStarRatingPress.bind(this)}  
          onChangeText={(text) => this.setState({feedbackText: text})}
          onSubmitFeedbacks={()=>{this.saveFeedbacks()}}
          />
      );}

       else{
      return(
      <Drawer  
        ref={(ref) => { this.drawer = ref;}}
        content={<Sidebar  name={customerInfo.fullName} />}
        onClose={()=> this.closeDrawer()} 
      >
      <View style={{flex:1}}>
        <AppHeader  openDrawer={this.openDrawer.bind(this)}
      />
      <View style={{flex:1}}>
        <MapContainer 
          coords={this.state.region} 
          markerP={this.state.markerPosition}
          destinationation_coords={this.state.destinationcords} 
      />
       
       <SearchboxContainer  
         handleInputChange={this.displayPredictions.bind(this)}  
         originName={this.state.origin}
         destinationName={this.state.destination}
         displayFare={(displayFare) => {this.setState({...this.state, displayFare: displayFare})}}  
      />

      { 
        this.state.predictions.length > 0 && 
        <Autoplacesuggestion 
          predictions={this.state.predictions} 
          handleSelectedItem={this.selectedAddress.bind(this)}  
        /> 
      }

      {
        this.state.displayFare && this.state.totalfare.length > 0 &&
        <BookingContainer  
         thefare={this.state.totalfare}  
         onPressAction={()=> {this.findDriver()}}  
         selectedValue={this.state.selected} 
         onValueChange={this.onValueChange.bind(this)}
         />
      }
      </View>
      </View>
      </Drawer>
      );}


}
}

module.exports = CustomerHome;


