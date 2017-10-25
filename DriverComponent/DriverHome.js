import React from 'react';
import {
  AppRegistry,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import io from 'socket.io-client/dist/socket.io'
import { Container, Drawer, Header, Content, Form, Item, Input,Icon, Button } from 'native-base';
import AppHeader from './appHeader'
import Sidebar from './sideBar'
import TripRequest from './TripRequest'
import socket from '../server/config'
//const WS_HOST = 'http://192.168.56.1:3000'

const tripdetails = null;

export default class DriverHome extends React.Component {
  static navigationOptions = {
    title:'',
    header: null
  };
 constructor(props) {

//let socket = io(WS_HOST)
    socket.on("connect", ()=>{
      console.log('driver connected to server');
    });

socket.on('triprequest', (data)=>{
        tripdetails = data.data;
        console.log('tripssssss', tripdetails);
      });

//console.log(tripdetails.pickUpAddress);


  super(props);
console.ignoredYellowBox = [
    'Setting a timer'
]
 this.state={
  show:false,
  data:{}
 }
}



componentDidMount(){

}


closeDrawer = () =>{
    this.drawer._root.close()
  };

  openDrawer = () => {
    this.drawer._root.open()
  };


render() {

if(tripdetails == null){
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
       <TripRequest  pickName={tripdetails.pickUpAddress} dropoffName={tripdetails.dropOffAddress} /> 
     </View>
  );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
  });

module.exports = DriverHome;