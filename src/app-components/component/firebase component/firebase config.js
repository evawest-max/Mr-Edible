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
  apiKey: "AIzaSyAVgfqHjefIfMY5qEroa8BPSLg5cF-q8kI",
  authDomain: "mr-edible-app-29b9c.firebaseapp.com",
  databaseURL: "https://mr-edible-app-29b9c-default-rtdb.firebaseio.com",
  projectId: "mr-edible-app-29b9c",
  storageBucket: "mr-edible-app-29b9c.appspot.com",
  messagingSenderId: "543967130031",
  appId: "1:543967130031:web:8cd0c43cc468aef2103f5a"
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

