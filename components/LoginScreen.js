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

import { Container, Header, Content, Form, Item, Input,Icon } from 'native-base';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Log In',
  };

 constructor(props) {
    super(props);
    this.state = { 
      username: '',
      usernameError:'',
      password: '',
      passwordError:'',
      errors: {}
    };
  }

  render() {

    return (
<View style={styles.container}>
            
             <Form style={styles.form}>
            <Item>
              <Icon name="person" color="white"/>
              <Input placeholder="Username" 
               keyboardType="email-address"
               returnKeyType="next"
               autoCapitalize="none"
               autoCorrect={false}
              
              />
            </Item>


            <Item>
              <Icon name="lock"/>
              <Input 
              placeholder="Password"
              returnKeyType="go"
              secureTextEntry
               />
            </Item>
          </Form>
</View>
         
        );
  }
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'rgb(189, 195, 199)'
  },

form :{
padding: 20,
paddingLeft: 20,


}


  });