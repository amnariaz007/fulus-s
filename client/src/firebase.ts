// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBqQeWowlsoksW9sZQS0yUvlqmHjUoL7Y8",
    authDomain: "the-rocket-1fcac.firebaseapp.com",
    projectId: "the-rocket-1fcac",
    storageBucket: "the-rocket-1fcac.appspot.com",
    messagingSenderId: "111204219025",
    appId: "1:111204219025:web:75033d2f8b65be3cec6730",
    measurementId: "G-9H5Q3Y5BKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);