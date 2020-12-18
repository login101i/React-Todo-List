// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase'


const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyB5K5KXDv2nDohoYufClAfI-F9TkXl9Pgk",
    authDomain: "todoapp-55075.firebaseapp.com",
    projectId: "todoapp-55075",
    storageBucket: "todoapp-55075.appspot.com",
    messagingSenderId: "101017404890",
    appId: "1:101017404890:web:fa873a17100e59cc6cece3",
    measurementId: "G-93KVDQBRJX"

})

const db=firebaseApp.firestore()


export  {db}