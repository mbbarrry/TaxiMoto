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

import StarRating from 'react-native-star-rating';
import { Container, Drawer, Header, Content, Form, Item, Input, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from "react-native-maps";
import Permissions from 'react-native-permissions'
const {width, height}= Dimensions.get('window'); 


const DriverEnroute=(props)=>(
<View style={styles.container}>
   <MapView
        style={styles.map}
        region={props.d_coords}
        provider="google"
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        followsUserLocation={true}
        loadingEnabled={true}
        toolbarEnabled={true}
        zoomEnabled={true}
        rotateEnabled={true}       
      >

       <MapView.Marker
          coordinate={props.d_coords}
          image={require('../../icons/color/scooter.png')}
        />
        
        <MapView.Marker
          coordinate={props.c_coords}
          pinColor="yellow"
        />

        <MapView.Marker
          coordinate={props.DropoffCords}
          pinColor='blue'
        />
              
      </MapView>     

{
  props.pickup == ! false ?
   <View style={styles.footerContainer}>
       <View style={styles.customerInfo}>
          <Icon name="user" size={30} style={{marginLeft:10, marginTop:20}}/>
       <View style={{flexDirection:'column'}}>
         <Text style={{marginLeft:20, marginTop:5, fontSize:15, fontWeight:'bold', color:'rgb(39, 174, 96)'}}> PICK UP </Text>
         <Text style={{marginLeft:20, fontSize:16, color:'#000000', marginTop:5}}>{props.customerName}</Text>
         <View style={{flexDirection:'row'}}>
           <Icon name="phone" size={20} style={{marginLeft:20, marginTop:6}} />
           <Text style={{marginLeft:20, marginTop:6, fontSize:15}}>{props.customerPhone}</Text>     
         </View>
        </View>
          <Text style={{marginLeft:150, marginTop:20, fontSize:15, color:'red'}}>{props.pickUpduration}</Text> 
       </View>

     
      <Button  style={{alignItems:'center', justifyContent:'center', marginLeft:17, marginTop:20, backgroundColor:'rgb(39, 174, 96)', borderRadius:5, width:width*0.9}}
       onPress={props.onPressStart}
      >
      <Text style={{color:'rgb(236, 240, 241)', fontSize:20, fontWeight:'bold'}}>START TRIP</Text>
      </Button>
   </View> 


  :  

<View style={styles.footerContainer}>
       <View style={styles.customerInfo}>
          <Icon name="user" size={30} style={{marginLeft:10, marginTop:20}}/>
       <View style={{flexDirection:'column'}}>
         <Text style={{marginLeft:20, marginTop:5, fontSize:15, fontWeight:'bold', color:'rgb(39, 174, 96)'}}> DROP0FF </Text>
         <Text style={{marginLeft:20, fontSize:16, color:'#000000', marginTop:5}}>{props.customerName}</Text>
         <View style={{flexDirection:'row'}}>
           <Icon name="phone" size={20} style={{marginLeft:20, marginTop:6}} />
           <Text style={{marginLeft:20, marginTop:6, fontSize:15}}>{props.customerPhone}</Text>     
         </View>
        </View>
          <Text style={{marginLeft:150, marginTop:20, fontSize:15, color:'red'}}>{props.dropoffduration}</Text> 
       </View>


      <Button  style={{alignItems:'center', justifyContent:'center', marginLeft:17, marginTop:20, backgroundColor:'#D50000', borderRadius:5, width:width*0.9}}
        onPress={props.onPressComplete}
      >
      <Text style={{color:'rgb(236, 240, 241)', fontSize:20, fontWeight:'bold'}}>COMPLETE</Text>
      </Button>
   </View> 


}



     
</View>    

)
  
const styles= StyleSheet.create({
container:{
  flex:1
},
map:{
  ...StyleSheet.absoluteFillObject
},
footerContainer:{
  top:500,
    width:width,
    backgroundColor: 'white',
    height:height*0.25,
    opacity:15
},
customerInfo:{
flexDirection:'row',
width:width,
borderRadius:4,
backgroundColor:'#E0E0E0',
height:height*0.12
}
});

module.exports= DriverEnroute;







































//  import React from 'react';
// import {
//   AppRegistry,
//   Text,
//   StyleSheet,
//   View,
//   Alert,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   TextInput,
//   Dimensions,
//   TouchableWithoutFeedback,
//   ToastAndroid 
// } from 'react-native';

// import StarRating from 'react-native-star-rating';
// import { Container, Drawer, Header, Content, Form, Item, Input, Button } from 'native-base';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import MapView from "react-native-maps";
// import Permissions from 'react-native-permissions'
// const {width, height}= Dimensions.get('window'); 


// const DriverEnroute=(props)=>(
// <View style={styles.container}>
//    <MapView
//         style={styles.map}
//         region={props.d_coords}
//         provider="google"
//         showsUserLocation={true}
//         showsMyLocationButton={true}
//         showsCompass={true}
//         followsUserLocation={true}
//         loadingEnabled={true}
//         toolbarEnabled={true}
//         zoomEnabled={true}
//         rotateEnabled={true}       
//       >

//        <MapView.Marker
//           coordinate={props.c_coords}
//           pinColor="green"
//         />
        
//         <MapView.Marker
//           coordinate={props.c_coords}
//           pinColor="yellow"
//         />

//         <MapView.Marker
//           coordinate={props.DropoffCords}
//           pinColor='blue'
//         />
              
//       </MapView>     

// {
//   props.pickup == ! false ?
//    <View style={styles.footerContainer}>
//        <View style={styles.customerInfo}>
//           <Icon name="user" size={30} style={{marginLeft:10, marginTop:20}}/>
//        <View style={{flexDirection:'column'}}>
//          <Text style={{marginLeft:20, marginTop:5, fontSize:15, fontWeight:'bold', color:'rgb(39, 174, 96)'}}> PICK UP </Text>
//          <Text style={{marginLeft:20, fontSize:16, color:'#000000', marginTop:5}}>{props.customerName}</Text>
//          <View style={{flexDirection:'row'}}>
//            <Icon name="phone" size={20} style={{marginLeft:20, marginTop:6}} />
//            <Text style={{marginLeft:20, marginTop:6, fontSize:15}}>{props.customerPhone}</Text>     
//          </View>
//         </View>
//           <Text style={{marginLeft:150, marginTop:20, fontSize:15, color:'red'}}>{props.pickUpduration}</Text> 
//        </View>

//       { 
//         props.pickUpduration > 1 ?  
//       <Button disabled style={{alignItems:'center', justifyContent:'center', marginLeft:17, marginTop:20, backgroundColor:'#9E9E9E', borderRadius:5, width:width*0.9}}>
//       <Text style={{color:'rgb(236, 240, 241)', fontSize:20, fontWeight:'bold'}}>START TRIP</Text>
//       </Button>
       
//        :

//       <Button  style={{alignItems:'center', justifyContent:'center', marginLeft:17, marginTop:20, backgroundColor:'rgb(39, 174, 96)', borderRadius:5, width:width*0.9}}
//        onPress={props.onPressStart}
//       >
//       <Text style={{color:'rgb(236, 240, 241)', fontSize:20, fontWeight:'bold'}}>START TRIP</Text>
//       </Button>

//       } 
//    </View> 


//   :  

// <View style={styles.footerContainer}>
//        <View style={styles.customerInfo}>
//           <Icon name="user" size={30} style={{marginLeft:10, marginTop:20}}/>
//        <View style={{flexDirection:'column'}}>
//          <Text style={{marginLeft:20, marginTop:5, fontSize:15, fontWeight:'bold', color:'rgb(39, 174, 96)'}}> DROP0FF </Text>
//          <Text style={{marginLeft:20, fontSize:16, color:'#000000', marginTop:5}}>{props.customerName}</Text>
//          <View style={{flexDirection:'row'}}>
//            <Icon name="phone" size={20} style={{marginLeft:20, marginTop:6}} />
//            <Text style={{marginLeft:20, marginTop:6, fontSize:15}}>{props.customerPhone}</Text>     
//          </View>
//         </View>
//           <Text style={{marginLeft:150, marginTop:20, fontSize:15, color:'red'}}>{props.dropoffduration}</Text> 
//        </View>

//       { 
//         props.dropoffduration == ! 0 ?  
//       <Button disabled style={{alignItems:'center', justifyContent:'center', marginLeft:17, marginTop:20, backgroundColor:'#9E9E9E', borderRadius:5, width:width*0.9}}>
//       <Text style={{color:'rgb(236, 240, 241)', fontSize:20, fontWeight:'bold'}}>COMPLETE</Text>
//       </Button>
       
//        :

//       <Button  style={{alignItems:'center', justifyContent:'center', marginLeft:17, marginTop:20, backgroundColor:'#D50000', borderRadius:5, width:width*0.9}}
//         onPress={props.onPressComplete}
//       >
//       <Text style={{color:'rgb(236, 240, 241)', fontSize:20, fontWeight:'bold'}}>COMPLETE</Text>
//       </Button>

//       } 
//    </View> 


// }



     
// </View>    

// )
  
// const styles= StyleSheet.create({
// container:{
//   flex:1
// },
// map:{
//   ...StyleSheet.absoluteFillObject
// },
// footerContainer:{
//   top:500,
//     width:width,
//     backgroundColor: 'white',
//     height:height*0.25,
//     opacity:15
// },
// customerInfo:{
// flexDirection:'row',
// width:width,
// borderRadius:4,
// backgroundColor:'#E0E0E0',
// height:height*0.12
// }
// });

// module.exports= DriverEnroute;


// // <MapView.Marker
// //           coordinate={props.c_coords}
// //           pinColor="red"
// //         />


// // <Button style={{alignItems:'center', justifyContent:'center', marginLeft:17, marginTop:20, backgroundColor:'rgb(39, 174, 96)', borderRadius:5, width:width*0.9}}>
// //       <Text style={{color:'rgb(236, 240, 241)', fontSize:20, fontWeight:'bold'}}>START TRIP</Text>
// //       </Button> 

// //<Text style={{marginLeft:20, marginTop:5, fontSize:15, fontWeight:'bold', color:'rgb(39, 174, 96)'}}> PICK UP </Text>
// //<Text style={{marginLeft:150, marginTop:20, fontSize:15}}>{props.duration}</Text>     



//  // <View style={styles.customerInfo}>
//  //        <Icon name="user" size={30} style={{marginLeft:5, marginTop:20}}/>
//  //        <View style={{flexDirection:'column'}}>
//  //        <Text style={{marginLeft:20, marginTop:5, fontSize:15, fontWeight:'bold', color:'rgb(39, 174, 96)'}}> PICK UP </Text>
//  //        <Text style={{marginLeft:20, fontSize:16, color:'#000000', marginTop:5}}> Mamadou </Text>
//  //        <View style={{flexDirection:'row'}}>
//  //        <Icon name="phone" size={20} style={{marginLeft:20, marginTop:6}} />
//  //        <Text style={{marginLeft:20, marginTop:6, fontSize:15}}>01545584775</Text>     
//  //        </View>
//  //        </View>
//  //        <Text style={{marginLeft:150, marginTop:20, fontSize:15}}>{props.duration}</Text>     
//  //      </View>
 

//  // <MapView.Marker
//  //          coordinate={props.d_markP}
//  //          pinColor="green"
//  //        />  