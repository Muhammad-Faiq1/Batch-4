


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAbWdUrWVV03oYGtI8-EzuTD7q5IbtwqjM",
    authDomain: "naya-notes.firebaseapp.com",
    projectId: "naya-notes",
    storageBucket: "naya-notes.appspot.com",
    messagingSenderId: "655031734631",
    appId: "1:655031734631:web:be871167e16eb28db85fc2",
    measurementId: "G-6MRX2ZEBMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);