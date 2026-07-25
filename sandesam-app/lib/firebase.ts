// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCyWfKDnMVj3nrd4qYTaUTAJljkvpzuNw",
  authDomain: "sandesam-app.firebaseapp.com",
  projectId: "sandesam-app",
  storageBucket: "sandesam-app.firebasestorage.app",
  messagingSenderId: "290597340897",
  appId: "1:290597340897:web:029e33462ea68395ab59a0",
  measurementId: "G-88WLD3S81Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);