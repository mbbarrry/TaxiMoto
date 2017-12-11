
import React from 'react';
import {
   AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Dimensions
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

import history from './history'
import payment from './payment'

const {width, height}= Dimensions.get('window');

class Sidebar extends React.Component{


constructor(props){
  super(props);
  console.log('p',props)
}
  render(){
    return(
      <Container style={{backgroundColor:"#E0F2F1"}}>
             <Content style={{backgroundColor:'#FFFFFF'}}>
         <List>
              <ListItem icon>
                <Left>
                  <Icon name="person" />
                </Left>
                <Body>
                  <Text>{this.props.name}</Text>
                </Body>
              </ListItem>
              <ListItem icon 
              //onPress={this.props.navigation.navigate('Payment')}
              >
                <Left>
                  <Icon name="time" />
                </Left>
                <Body>
                  <Text>History</Text>
                </Body>
              </ListItem>
              <ListItem icon 
              //onPress={this.props.navigation.navigate('History')}
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

export default Sidebar;