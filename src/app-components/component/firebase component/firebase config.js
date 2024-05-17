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
  apiKey: "AIzaSyChGRMhTFRlv-tXlEXOG6mCyFPOYrwaZ3E",
  authDomain: "mr-edible-pro-app.firebaseapp.com",
  databaseURL: "https://mr-edible-pro-app-default-rtdb.firebaseio.com",
  projectId: "mr-edible-pro-app",
  storageBucket: "mr-edible-pro-app.appspot.com",
  messagingSenderId: "1029018922610",
  appId: "1:1029018922610:web:1d5847ad3a1e10c0b41ceb"

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

