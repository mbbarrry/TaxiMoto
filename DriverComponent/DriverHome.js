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

const WS_HOST = 'http://192.168.56.1:3000'
// const WS_HOST = 'https://aa270f00.ngrok.io'

export default class DriverHome extends React.Component {
  static navigationOptions = {
    title:'',
    header: null
  };
 constructor(props) {
    let socket = io(WS_HOST)

    super(props);
    console.log('driver home')
    socket.on("connect", (e)=>{
      console.log('connected', e);
      socket.emit('ms', {msg: 'asf'})
    });
    socket.on("ms", (e)=>{
      console.log('received ms', e)
    });
    console.log('socket', socket)
}



closeDrawer = () =>{
    this.drawer._root.close()
  };

  openDrawer = () => {
    this.drawer._root.open()
  };


  render() {
    return (

<Drawer  
ref={(ref) => { this.drawer = ref;}}
content={<Sidebar/>}
onClose={()=> this.closeDrawer()} 
>

<View style = {styles.container}>
 <AppHeader  openDrawer={this.openDrawer.bind(this)}/>
 <Button >
 </Button>
  <Text>My driver content here </Text>
  </View>
  
</Drawer>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
  });

module.exports = DriverHome;