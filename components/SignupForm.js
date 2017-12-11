import React from 'React';
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TextInput,
  Dimensions,
  AsyncStorage
}
from "react-native";
import { Container, Header, Content, Form, Item, Input, Icon, Button } from 'native-base';
import request from '../CustomerComponents/request'
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'


export default class SignupForm extends React.Component{


 static navigationOptions = {
    title:'SignupForm',
  };

  constructor(props, context) {
    super(props, context);

  }

  handleValueChange(values) {
   //console.log('handleValueChange', values)
    this.setState({ form: values })
  }


render() {
  const {navigate} = this.props.navigation;
    return (     
<GiftedForm
        formName='signupForm' // GiftedForm instances that use the same name will also share the same states
        openModal={(route) => {
          navigator.push(route); // The ModalWidget will be opened using this method. Tested with ExNavigator
        }}

        onValueChange={this.handleValueChange.bind(this)}
        clearOnClose={false} // delete the values of the form when unmounted
        defaults={{
          /*
          username: 'Farid',
          'gender{M}': true,
          password: 'abcdefg',
          country: 'FR',
          birthday: new Date(((new Date()).getFullYear() - 18)+''),
          */
        }}
        validators={{
          fullName: {
            title: 'Full name',
            validate: [{
              validator: 'isLength',
              arguments: [4, 23],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            }]
          },
          userName: {
            title: 'UserName',
            validate: [{
              validator: 'isLength',
              arguments: [3, 16],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            },{
              validator: 'matches',
              arguments: /^[a-zA-Z0-9]*$/,
              message: '{TITLE} can contains only alphanumeric characters'
            }]
          },
          password: {
            title: 'Password',
            validate: [{
              validator: 'isLength',
              arguments: [6, 16],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            }]
          },
          emailAddress: {
            title: 'Email address',
            validate: [{
              validator: 'isLength',
              arguments: [6, 255],
            },{
              validator: 'isEmail',
            }]
          },
          phoneNumber:{
            title: 'Phone Number',
            validate:[{
              validator:'isLength',
              arguments:[11, 15]   
            },{
              validator:'isNumeric',
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            }]
          } 
        }}
      >
        <GiftedForm.SeparatorWidget />

        <GiftedForm.TextInputWidget
          name='fullName' // mandatory
          title='Full name'
          image={require('../icons/color/user.png')}
          placeholder='Barry Mamadou'
          clearButtonMode='while-editing'
        />

        <GiftedForm.TextInputWidget
          name='userName'
          title='UserName'
          image={require('../icons/color/contact_card.png')}
          placeholder='mbbarry91'
          clearButtonMode='while-editing'
          // onTextInputFocus={(currentText = '') => {
          //   if (!currentText) {
          //     let fullName = GiftedFormManager.getValue('signupForm', 'fullName');
          //     if (fullName) {
          //       return fullName.replace(/[^a-zA-Z0-9-_]/g, '');
          //     }
          //   }
          //   return currentText;
          // }}
        />

        <GiftedForm.TextInputWidget
          name='password' // mandatory
          title='Password'
          placeholder='******'
          clearButtonMode='while-editing'
          secureTextEntry={true}
          image={require('../icons/color/lock.png')}
        />

        <GiftedForm.TextInputWidget
          name='emailAddress' // mandatory
          title='Email address'
          placeholder='example@yahoo.com'
          keyboardType='email-address'
          clearButtonMode='while-editing'
          image={require('../icons/color/email.png')}
        />
         
        <GiftedForm.TextInputWidget
          name='phoneNumber' // mandatory
          title='H/P'
          placeholder='01122843274'
          keyboardType='numeric'
          clearButtonMode='while-editing'
          image={require('../icons/color/contact_card.png')}
        />

        <GiftedForm.SwitchWidget
          name='isDriver'
          title='SignUp as Driver'
        />

        <GiftedForm.ErrorsWidget/>

        <GiftedForm.SubmitWidget
          title='Sign up'
          widgetStyles={{
            submitButton: {
              backgroundColor: 'green',
            }
          }}

          onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null ) => {
            if (isValid === true) {
            console.log(values);
        request.post("http://172.20.10.2:3000/api/users")
                   .send(values)
                   .finish((error, res)=>{
                     if(error){
                      postSubmit(['server is offline, please try again']);
                     }
                    else{
                          if(res.body.error){
                            postSubmit(res.body.error);
                          }
                          else if(res.body.dbError){
                            postSubmit(res.body.dbError);
                          }
                          else{
                              AsyncStorage.removeItem('user', (error)=>{
                              if(error){
                                console.log('fail to remove', error);
                                }
                              else{
                                console.log('data removed');
                                  }
                              });
                              GiftedFormManager.reset('signupForm');
                              navigate('Login');
                          }
                      }
                   });    
            }
          }}
        />

        <GiftedForm.NoticeWidget
          title='By signing up, you agree to the Terms of Service and Privacy Policity.'
        />
      
      </GiftedForm>
    );
  }

}

    
