import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyA59wZIatxJ1lEO-DT1K68nIY5YUUyaQGY',
  authDomain: 'sportona-muutos.firebaseapp.com',
  projectId: 'sportona-muutos',
  storageBucket: 'sportona-muutos.appspot.com',
  messagingSenderId: '844695600486',
  appId: '1:844695600486:web:d35f6f0296922bb3309ca7',
  measurementId: 'G-3D61WFWDB5',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
