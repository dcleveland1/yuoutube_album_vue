import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

console.log(process.env.VUE_APP_apiKey);
const firebaseConfig = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  projectId: process.env.VUE_APP_projectId,
  storageBucket: process.env.VUE_APP_storageBucket,
  messagingSenderId: process.env.VUE_APP_messagingSenderId,
  appId: process.env.VUE_APP_appId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
