// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {  
  apiKey: "AIzaSyDTS9zAfJiFsZB4Yl42HpGXt0jDCJgNtuQ",
  authDomain: "mr-edible-d79b7.firebaseapp.com",
  databaseURL: "https://mr-edible-d79b7-default-rtdb.firebaseio.com",
  projectId: "mr-edible-d79b7",
  storageBucket: "mr-edible-d79b7.appspot.com",
  messagingSenderId: "1035970516483",
  appId: "1:1035970516483:web:8bb57b667064f230c02036"
};

// Initialize Cloud Storage and get a reference to the service
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// Initialize Firebase database and get a reference to the service
const database = getDatabase(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);
const provider = new GoogleAuthProvider();
export {database, auth, provider, storage, messaging}

