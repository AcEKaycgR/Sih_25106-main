
import {initializeApp, getApps, getApp, type FirebaseApp} from 'firebase/app';
import {getFirestore, type Firestore} from 'firebase/firestore';
import {getAuth, type Auth} from 'firebase/auth';

const firebaseConfig = {
  projectId: 'studio-734908800-a65ec',
  appId: '1:116822925593:web:ad65e9f0ce1ce0a510e588',
  apiKey: 'AIzaSyA5U-TK-b7CpNST95pHmZ1IpiY1mYkyn8s',
  authDomain: 'studio-734908800-a65ec.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '116822925593',
};

// Initialize Firebase
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export {app, auth, db};
