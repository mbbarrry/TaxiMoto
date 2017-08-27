import React from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View,
} from 'react-native';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
    	<Text>Hello, Navigation! hei</Text>
      <Button onPress={() => navigate('Chat')} title="Chat with Lucy"/>
    	<Button onPress={() => navigate('NewScreen')} title="Go to new screen"/>
      </View>
    );
  }
}

export default HomeScreen