import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCPJIqkX85ecaEiu7qtySqNk-6ZEgA0vRs",
    authDomain: "dpmg-imsdb.firebaseapp.com",
    databaseURL: "https://dpmg-imsdb.firebaseio.com",
    projectId: "dpmg-imsdb",
    storageBucket: "dpmg-imsdb.appspot.com",
    messagingSenderId: "705829300830"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({
    timestampsInSnapshots: true
});

export default firebaseApp.firestore()