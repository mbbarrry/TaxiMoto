import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import MapContainer from '../CustomerComponents/MapContainer'
import Main from './Main'
import DriverHome from '../DriverComponent/DriverHome'


const mapNavigationStateParamsToProps = (SomeComponent) => {
    return class extends React.Component {
        static navigationOptions = SomeComponent.navigationOptions; 
        render() {
            const {navigation: {state: {params}}} = this.props
            return <SomeComponent {...params} {...this.props} />
        }
    }
}

const SimpleApp = StackNavigator({
  Home: { screen: mapNavigationStateParamsToProps(Main) },
  CustomerHomeScreen: {screen: mapNavigationStateParamsToProps(MapContainer)},
  DriverScreen: {screen: mapNavigationStateParamsToProps(DriverHome)}
},

{
headerMode: 'screen'
}
);

export default SimpleApp