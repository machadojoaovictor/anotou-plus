// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBna5wL2bUb7SX9Q_24UZ_eXxrrwb6tB2c",
  authDomain: "anotou-3ef0c.firebaseapp.com",
  projectId: "anotou-3ef0c",
  storageBucket: "anotou-3ef0c.firebasestorage.app",
  messagingSenderId: "334361061650",
  appId: "1:334361061650:web:0f31be84a7a67396e6abcb",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };
