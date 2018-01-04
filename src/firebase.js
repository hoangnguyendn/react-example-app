import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBONm1beNQSioKRsFL66k9MsloDzQH6i6c",
    authDomain: "react-burger-7b5aa.firebaseapp.com",
    databaseURL: "https://react-burger-7b5aa.firebaseio.com/",
    storageBucket: "react-burger-7b5aa.appspot.com",
    messagingSenderId: "467796404098",
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;