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
  apiKey: "AIzaSyBJv2H-W4ltOr7g-h7lJon79QY6xQCLnFA",
  authDomain: "mr-edible-apps.firebaseapp.com",
  databaseURL: "https://mr-edible-apps-default-rtdb.firebaseio.com",
  projectId: "mr-edible-apps",
  storageBucket: "mr-edible-apps.appspot.com",
  messagingSenderId: "1017195845972",
  appId: "1:1017195845972:web:6457b7d60dafc66f3810c1"
  
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

