// import firebase from 'firebase'

import * as firebase from "firebase";

export default class Config {
	static init () {
		if (!firebase.apps.length) {
			firebase.initializeApp({
				apiKey: "AIzaSyDFKdCt0-1braXswfzoCBgG4P0zLwj9VNI",
				authDomain: "taximoto-824cf.firebaseapp.com",
				databaseURL: "https://taximoto-824cf.firebaseio.com",
				projectId: "taximoto-824cf",
				storageBucket: "taximoto-824cf.appspot.com",
				messagingSenderId: "755962749806"
			});
		}
		this.firebase = firebase;
	}
}