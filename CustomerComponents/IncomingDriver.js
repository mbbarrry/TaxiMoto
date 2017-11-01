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
import Permissions from 'react-native-permissions'

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


//function to close drawer
closeDrawer = () =>{
    this.drawer._root.close()
  };

//function to open drawer
  openDrawer = () => {
    this.drawer._root.open()
  };

render() {
  return(
    
<Drawer  
ref={(ref) => { this.drawer = ref;}}
content={<Sidebar/>}
onClose={()=> this.closeDrawer()} 
>

<View style = {styles.container}>
 <AppHeader  openDrawer={this.openDrawer.bind(this)}/>
 
<MapView
    style={styles.map}
    region={this.state.region}
    ref={(ref) => { this.mapRef = ref }}>
  
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

   </MapView>



 </View>
</Drawer>


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

module.exports = MapContainer;
