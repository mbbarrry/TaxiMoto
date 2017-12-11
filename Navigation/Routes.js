
import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Main from './Main'
import login from '../components/loginScreen'
import SignupForm from '../components/SignupForm'
import DriverHome from '../DriverComponent/DriverHome'
import CustomerHome from '../CustomerComponents/CustomerHome'

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
  
  Main: { screen: mapNavigationStateParamsToProps(Main)},
  Signup: { screen: mapNavigationStateParamsToProps(SignupForm)},
  Login: { screen: mapNavigationStateParamsToProps(login) },
  CustomerHome: {screen: mapNavigationStateParamsToProps(CustomerHome)},
  DriverHome: {screen: mapNavigationStateParamsToProps(DriverHome)}
},

{
headerMode: 'screen'
}
);

export default SimpleApp















