// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgn-XBbgEQtF-anQmNSyI-rarMIbUB2wE",
  authDomain: "email-password-auth-a7e6e.firebaseapp.com",
  projectId: "email-password-auth-a7e6e",
  storageBucket: "email-password-auth-a7e6e.firebasestorage.app",
  messagingSenderId: "938918953845",
  appId: "1:938918953845:web:cfae57b48334d23d51c93c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);