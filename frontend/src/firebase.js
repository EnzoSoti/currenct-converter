// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPin3FAiD_6ZUmK2LTx6x6fDuJzV96yuY",
  authDomain: "chat-app-82a67.firebaseapp.com",
  projectId: "chat-app-82a67",
  storageBucket: "chat-app-82a67.firebasestorage.app",
  messagingSenderId: "76189211083",
  appId: "1:76189211083:web:2640d914910e85e6a67e4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app;