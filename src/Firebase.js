import {initializeApp} from "firebase/app";
import {getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyA_8QgueEF9EZ0d0y6H_xRnjWLs_6xNXew",
    authDomain: "educart-47b37.firebaseapp.com",
    projectId: "educart-47b37",
    storageBucket: "educart-47b37.appspot.com",
    messagingSenderId: "58922502335",
    appId: "1:58922502335:web:e4c02a52c297432776de0a",
    measurementId: "G-9KDCFW8FWJ"
    
  };
  

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);
  export const db = getFirestore(app);