
import React from 'react';
import {StyleSheet, View, Alert, Text, StatusBar, Dimensions } from "react-native";
import {Button, Toast} from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

export default class TripRequest extends React.Component {
 constructor(props) {
  super(props);
    
 }

  render() {
    return (

<View style={styles.container}>


      <Text style={styles.text}>W've got you customer!</Text>
      <Icon name="map-marker"  style={styles.locationIcon}/>

     <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center'}}> 
       <View style={styles.pickup} >
        <Text>{this.props.pickName}</Text>
        </View>

        <Icon name="long-arrow-down"  style={styles.toArrow}/>
        
        <View style={styles.dropoff} >
        <Text>{this.props.dropoffName}</Text>
        </View>

         <Text style={styles.termsText}>By booking you accept our T&C </Text>

         <View style={{flex:1, flexDirection:'row'}}>
         <Button style={styles.btnStyle1} 

          onPress={this.props.onPressAction}
         >
          <Text style={styles.btnText}> Confirm </Text>
         </Button>

         <Button style={styles.btnStyle2} >
          <Text style={styles.btnText}> Cancel</Text>
         </Button>
         </View>
    </View>
        

</View>   
  );
  }
}
const styles= StyleSheet.create({
    container:{ 
    flex: 1,
    backgroundColor:'rgb(52, 73, 94)',
    justifyContent:'center',
    alignItems:'center'
    },
    
     text: {
        color: "white",
        fontSize:17,
        marginBottom:15,
        marginTop:20
    },

     locationIcon:{
        color: "#fff",
        fontSize: 40,
        marginTop:15
    },
    
    pickup:{
        width:width * 0.7,
        borderRadius:7,
        height:45,
        backgroundColor:"#fff",
        marginTop:260,
        justifyContent: "center",
        alignItems: "center"
    },
     
     toArrow:{
        color:"#fff",
        fontSize:20,
        marginTop:10,
    },
    
     dropoff:{
        width:width * 0.7,
        borderRadius:7,
        height:45,
        backgroundColor:"#fff",
        marginTop:10,
        justifyContent: "center",
        alignItems: "center"
    },

     termsText:{
        color:"#fff",
        textAlign:"center",
        fontSize:16,
        marginTop:15
    },

     btnStyle1: {
        justifyContent:"center",
        alignItems: 'center',
        borderRadius: 7,
        backgroundColor: 'green',
        height: 45,
        width: width*0.4,
        marginTop:20,
        margin: 10,
        paddingHorizontal: 10
      },

btnStyle2: {
        justifyContent:"center",
        alignItems: 'center',
        borderRadius: 7,
        backgroundColor: 'red',
        height: 45,
        width: width*0.4,
        marginTop:20,
        margin: 10,
        paddingHorizontal: 10
      },



       btnText: {
        fontSize: 20,
        color: 'rgb(236, 240, 241)'
    },

  });
module.exports = TripRequest;