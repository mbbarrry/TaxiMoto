import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput
} from 'react-native';

import {Header, Body, Title, Icon, Button, Left, Right} from 'native-base';

export default class AppHeader extends React.Component {
  

  render() {

    return (
      
 		<Header style={{backgroundColor:'rgb(149, 165, 166)'}}>
          <Left>
            <Button transparent>
              <Icon name='menu' style={styles.icon} />
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
        color:"rgb(44, 62, 80)",
        fontSize: 20
    },
  });

