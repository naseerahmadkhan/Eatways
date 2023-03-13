// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAY4kqwcUiAapplzKzBCZ2DN4sJWJcecuY",
  authDomain: "rndev-60404.firebaseapp.com",
  projectId: "rndev-60404",
  storageBucket: "rndev-60404.appspot.com",
  messagingSenderId: "298707374166",
  appId: "1:298707374166:web:abe1617003df1a62d16bf7",
  measurementId: "G-3V9J6V5HZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
 export const auth = getAuth(app);


