// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAeNcJm433ak7FnpSEIdpezulUnbxemO2w",
    authDomain: "notes-80a6c.firebaseapp.com",
    projectId: "notes-80a6c",
    storageBucket: "notes-80a6c.appspot.com",
    messagingSenderId: "172333097782",
    appId: "1:172333097782:web:94d32274f07570b54c0997",
    measurementId: "G-TX6R1HZ476"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);