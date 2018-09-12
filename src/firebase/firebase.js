import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyDcVh4PCOS5XchkPAegJX8yFj15RHYuLRA",
  authDomain: "rtd-mobile-app-1536438308113.firebaseapp.com",
  databaseURL: "https://rtd-mobile-app-1536438308113.firebaseio.com",
  projectId: "rtd-mobile-app-1536438308113",
  storageBucket: "rtd-mobile-app-1536438308113.appspot.com",
  messagingSenderId: "768944553740"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth
};