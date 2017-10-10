
import React from 'react';
import {StyleSheet, View, Alert, Text, StatusBar, Dimensions } from "react-native";
import {Button, Toast} from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

export default class TripInfo extends React.Component {
 constructor(props) {
  super(props);

 }

//setTimeout(function(){ Alert.alert("driver found!")}, 3000);


  render() {
    return (

<View style={styles.container}>

         <StatusBar
             backgroundColor='rgb(22, 160, 133)'
             barStyle="light-content" 
          /> 

      <Text style={styles.text}>Please wait while we find you a driver</Text>
      <Icon name="map-marker"  style={styles.locationIcon}/>

     <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center'}}> 
       <View style={styles.pickup} >
        <Text>{this.props.originName}</Text>
        </View>
        <Icon name="long-arrow-down"  style={styles.toArrow}/>
        <View style={styles.dropoff} >
        <Text>{this.props.destinationName}</Text>
        </View>
         <Text style={styles.termsText}>By booking you accept our T&C </Text>

         <Button style={styles.btnStyle} >
          <Text style={styles.btnText}> Cancel </Text>
         </Button>

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

     btnStyle: {
        justifyContent:"center",
        alignItems: 'center',
        borderRadius: 7,
        backgroundColor: 'red',
        height: 45,
        width: width*0.7,
        marginTop:20,
        margin: 10,
        paddingHorizontal: 10
      },
       btnText: {
        fontSize: 20,
        color: 'rgb(236, 240, 241)'
    },

  });