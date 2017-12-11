
import React from 'react';
import {
   AppRegistry,
  StyleSheet,
  View
}
from 'react-native';

import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Thumbnail
} from 'native-base';

import History from './history'
import Payment from './payment'
import { DrawerNavigator, StackNavigator } from "react-navigation";

export default class Sidebar extends React.Component{

  render(){
    return(
      <Container style={{backgroundColor:"#E0F2F1"}}>
             <Content style={{backgroundColor:'#FFFFFF'}}>
         <List>
              <ListItem icon 
              //onPress={()=> navigate('History')}
              >
                <Left>
                  <Icon name="person" />
                </Left>
                <Body>
                  <Text>{this.props.name}</Text>
                </Body>
              </ListItem>
              <ListItem icon 
              //onPress={()=> navigate('Payment')}
              >
                <Left>
                  <Icon name="time" />
                </Left>
                <Body>
                  <Text>History</Text>
                </Body>
              </ListItem>
              <ListItem icon //onPress={()=>{Actions.settings()}}
              >
                <Left>
                  <Icon name="card" />
                </Left>
                <Body>
                  <Text>Payment</Text>
                </Body>
              </ListItem>
         </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }

  });

const Navigation = StackNavigator({
Sidebar: { screen: Sidebar},
Payment: { screen: Payment},
History: { screen: History}

});