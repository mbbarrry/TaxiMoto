import React from 'React';
import {
	View,
	StyleSheet,
  getCoordinate,

}
from "react-native";
import MapView from "react-native-maps";
import Permissions from 'react-native-permissions'

export default class MapContainer extends React.Component{

componentDidMount(){

    // Permissions.check('location', 'whenInUse')
    //   .then(response => {
    //     this.setState({ locationPermission: response })
    //   });
   

    // Permissions.request('location', 'whenInUse')
    //   .then(response => {
    //     this.setState({ locationPermission: response })
    //   });
  
 
    // Permissions.request('notification')
    //   .then(response => {
    //     this.setState({ notificationPermission: response })
    //   })

    this.addMarker();
}

onRegionChange(region) {
  console.log('region', region);
  this.setState({ region });
}

constructor(props){
  super(props);
  this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
     markers:[],
  };

}      

addMarker(markerData) {
  markerData = {
        id: 1,
        coordinate: {
          latitude: 37.78825,
          longitude: -122.4324
        },
        title: 'test marker',
        description: 'marker no. 1',
       };
  console.log('adding marker', markerData);
  this.setState({
    ...this.state,
    markers: [...this.state.markers, markerData]
  });
}

render(){
  console.log('# of markers', this.state.markers.length);
	return(
	 <View style={styles.container}>

  <MapView showMyLocationButton={true} region={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
          style={styles.map}
        />
    {this.state.markers.map(marker => {
      <MapView.Marker coordinate={marker.coordinate}
        title={marker.title}
        key={marker.id.toString()}
        description={marker.description}
      />
    })}
 		</View>
	
	);
}
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 658,
    width: 500,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
