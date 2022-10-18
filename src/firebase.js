
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getStorage } from "firebase/storage";
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5YDVxIx7eUXY7kRqLaUhLQOPs6uLaCRc",
  authDomain: "chat-2f181.firebaseapp.com",
  projectId: "chat-2f181",
  storageBucket: "chat-2f181.appspot.com",
  messagingSenderId: "15410559216",
  appId: "1:15410559216:web:5fa4ec719ea235abe2aa35"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const storage = getStorage();
export const db=getFirestore();