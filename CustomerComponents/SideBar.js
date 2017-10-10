import React from 'react';
import {
	Text,
}
from 'react-native';
import {Content} from 'native-base';

export default class Sidebar extends React.Component{
	render(){
		return(
			<Content style={{backgroundColor:"#B2DFDB"}}>
				<Text>Drawer</Text>
			</Content>
			);
	}
}