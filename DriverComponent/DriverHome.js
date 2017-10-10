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

import { Container, Drawer, Header, Content, Form, Item, Input,Icon } from 'native-base';
import AppHeader from './appHeader'
import Sidebar from './sideBar'

export default class DriverHome extends React.Component {
  static navigationOptions = {
    title: null,
  };

 constructor(props) {
    super(props);
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