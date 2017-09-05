import React from 'react';
import {
  AppRegistry,
} from 'react-native';



import Main from './Main'
import RegistrationScreen from './RegistrationScreen'
import LoginScreen from './LoginScreen'

import { StackNavigator } from 'react-navigation';

const mapNavigationStateParamsToProps = (SomeComponent) => {
    return class extends React.Component {
        static navigationOptions = SomeComponent.navigationOptions; // better use hoist-non-react-statics
        render() {
            const {navigation: {state: {params}}} = this.props
            return <SomeComponent {...params} {...this.props} />
        }
    }
}

const Router = StackNavigator({
  Home: { screen: mapNavigationStateParamsToProps(Main) },
  RegistrationScreen: { screen : mapNavigationStateParamsToProps(RegistrationScreen)},
  LoginScreen: { screen: mapNavigationStateParamsToProps(LoginScreen) },
});

export default Router