import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB-fb7v4i3rNAAN0tyKAkziKM07kDw9nJg",
    authDomain: "hackdevpuebla2020.firebaseapp.com",
    databaseURL: "https://hackdevpuebla2020.firebaseio.com",
    projectId: "hackdevpuebla2020",
    storageBucket: "hackdevpuebla2020.appspot.com",
    messagingSenderId: "516160319677",
    appId: "1:516160319677:web:7519911ba432df0f8587d4",
    measurementId: "G-1NZFSK6KY3"
  };

  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth;
  export const db = firebase.database();