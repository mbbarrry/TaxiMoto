import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import { Container, Drawer, Header, Content, Form, Item, Input,Icon, Button } from 'native-base';
const {width, height}= Dimensions.get('window'); 



const history = (props) => (

<View style = {styles.container}>
        <Text>history</Text>
 </View>

)


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'rgba(0, 0, 0, 0.5)'
    }

});

module.exports = history;