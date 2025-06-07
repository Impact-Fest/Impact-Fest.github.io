// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCtq8WkL0dQTWAglAR1tIDWr_9CrXiZ038",
    authDomain: "landing-page-b2717.firebaseapp.com",
    projectId: "landing-page-b2717",
    storageBucket: "landing-page-b2717.firebasestorage.app",
    messagingSenderId: "440182742623",
    appId: "1:440182742623:web:98902c1c935f28d5dd05ea"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();