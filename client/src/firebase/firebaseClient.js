import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';
import { firebaseConfig } from './config';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;