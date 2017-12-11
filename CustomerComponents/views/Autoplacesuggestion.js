import React from 'react';
import {
  AppRegistry,
  Text,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  ToastAndroid 
} from 'react-native';

import {List, ListItem, Left, Body, Header, Title, Button, Right} from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
const {width, height}= Dimensions.get('window'); 

const Autoplacesuggetion=(props)=>(
<View style={styles.searchResultsWrapper} >
          <List 
            dataArray={props.predictions}
            renderRow={(item)=>
              <View>
                <ListItem onPress={ () => { props.handleSelectedItem(item) } } button avatar>
                  <Left style={styles.leftContainer}>
                      <Icon style={styles.leftIcon} name="location-on" />
                  </Left>
                  <Body>
                    <Text style={styles.primaryText}>{item.primaryText}</Text>
                    <Text style={styles.secondaryText}>{item.secondaryText}</Text>
                  </Body>
                </ListItem>
              </View>
              }
            />
        </View>
)

const styles= StyleSheet.create({
    searchResultsWrapper:{
        top:170,
        position:"absolute",
        width:width,
        height:1000,
        backgroundColor:"#fff",
        opacity:0.9
    },
    primaryText:{
        fontWeight: "bold",
        color:"#373737"
    },
    secondaryText:{
        fontStyle: "italic",
        color:"#7D7D7D",
    },
    leftContainer:{
        flexWrap: "wrap",
        alignItems: "flex-start",
        borderLeftColor:"#7D7D7D",
    },
    leftIcon:{
        fontSize:20,
        color:"#7D7D7D",
    },
    distance:{
        fontSize:12,
    }
});


module.exports= Autoplacesuggetion;