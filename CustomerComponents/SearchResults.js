import React from 'react';
import {StyleSheet, Alert } from "react-native";

import {View, List, ListItem, Left, Dimensions, Body, Text, Header, Title, Button, Right, Icon } from "native-base";

export default class SearchResults extends React.Component {

constructor(props) {
  super(props);
 }

  render() {
      return(
        <View style={styles.searchResultsWrapper} >
          <List 
            dataArray={this.props.predictions}
            renderRow={(item)=>
              <View>
                <ListItem onPress={ () => { this.props.handleSelectedItem(item) } } button avatar>
                  <Left style={styles.leftContainer}>
                   
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

      );
  };
}


const styles= StyleSheet.create({
    searchResultsWrapper:{
        top:200,
        position:"absolute",
        width:500,
        height:450,
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