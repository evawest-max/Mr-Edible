// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCv3E4Q72f4GflrMIo6AIPFf5DVGjCBQXM",
//   authDomain: "mr-edible.firebaseapp.com",
//   databaseURL: "https://mr-edible-default-rtdb.firebaseio.com",
//   projectId: "mr-edible",
//   storageBucket: "mr-edible.appspot.com",
//   messagingSenderId: "1016965203142",
//   appId: "1:1016965203142:web:577a75d861000626d983c7",
//   measurementId: "G-FXM96FNY1F"
// };
const firebaseConfig = {
  apiKey: "AIzaSyBY-_OrcVLsR4Cs8_Yt9gtFrYcf94FF0l4",
  authDomain: "mr-edible-pro.firebaseapp.com",
  databaseURL: "https://mr-edible-pro-default-rtdb.firebaseio.com",
  projectId: "mr-edible-pro",
  storageBucket: "mr-edible-pro.appspot.com",
  messagingSenderId: "271918640757",
  appId: "1:271918640757:web:54d049c5924a2bd111923c",
  
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

