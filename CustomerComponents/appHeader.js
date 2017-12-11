import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  StatusBar
} from 'react-native';

import {Header, Body, Title, Icon, Button, Left, Right} from 'native-base';

export default class AppHeader extends React.Component {
  

  render() {
    return (    
    <Header style={{backgroundColor:'rgb(22, 160, 133)'}}>
    <StatusBar
     backgroundColor='rgb(22, 160, 133)'
     barStyle="light-content"
   /> 
          <Left>
            <Button transparent onPress={()=>this.props.openDrawer()}>
              <Icon name='menu' style={styles.icon} size={100}/>
            </Button>
          </Left>
          <Body>
            
          </Body>
          <Right />
        </Header>
      
    );
  }
}


const styles = StyleSheet.create({
    icon: {
        color:"rgb(236, 240, 241)",
    }
  });

