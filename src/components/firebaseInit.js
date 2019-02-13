import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "FIREBASE_DOMAIN",
    databaseURL: "FIREBASE_URL",
    projectId: "PROJECT_ID",
    storageBucket: "APPSPOT",
    messagingSenderId: "ID"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({
    timestampsInSnapshots: true
});
export default firebaseApp.firestore()
