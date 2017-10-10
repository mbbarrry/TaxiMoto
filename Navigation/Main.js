import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  View,
} from 'react-native';

class Main extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    const {navigate} = this.props.navigation;
   return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.logo}> TaxiMoto</Text>
                    <Text style={styles.slogantext}>The ultimate taximoto driving experience</Text>

                    <View style={styles.buttonContainer}>

                        <TouchableOpacity onPress={() => navigate('CustomerHomeScreen')} style={styles.buttonStyle1}>
                            <Text style={styles.buttonText1}>Customer</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => navigate('DriverScreen')} style={styles.buttonStyle2}>
                            <Text style={styles.buttonText2}>Driver</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },

    logo: {
        alignSelf: 'center',
        margin: 50,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'rgb(46, 204, 113)',
    },
    slogantext: {
        alignSelf: 'center',
        color: 'rgb(236, 240, 241)',
        fontSize: 15
    },

    buttonContainer: {
        alignSelf: 'center',
        alignItems: 'flex-end',
        marginTop: 200
    },

    buttonStyle1: {
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: 'rgb(39, 174, 96)',
        height: 45,
        width: 230,
        margin: 10,
        paddingHorizontal: 10,


    },
    buttonStyle2: {
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: 'rgb(236, 240, 241)',
        height: 45,
        width: 230,
        margin: 10,
        paddingHorizontal: 10,


    },

    buttonText1: {
        alignItems: 'center',
        fontSize: 17,
        color: 'rgb(236, 240, 241)',
        margin: 10,
        fontWeight: 'bold'
    },

    buttonText2: {
        alignItems: 'center',
        fontSize: 17,
        color: 'rgb(0,0,0)',
        margin: 10,
        fontWeight: 'bold'
    },


    intructText: {
        alignSelf: 'center',
        fontSize: 15,
        color: "white",
    }
});




export default Main