// Import the necessary functions from Firebase SDKs
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  // Import the authentication service
import { getFirestore } from 'firebase/firestore';  // Import Firestore service
import { getAnalytics } from 'firebase/analytics';  // Import Firebase Analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCkV2aOJnFPIcIq4qfOrG--QySjruGtPg",
  authDomain: "registrohabitos-723b4.firebaseapp.com",
  projectId: "registrohabitos-723b4",
  storageBucket: "registrohabitos-723b4.firebasestorage.app",
  messagingSenderId: "193429898723",
  appId: "1:193429898723:web:27a4a27d0267d2e2b50cd6",
  measurementId: "G-W6VQDW046G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);  // Auth service
const firestore = getFirestore(app);  // Firestore service
const analytics = getAnalytics(app);  // Analytics service

// Export the services for use in other parts of the app
export { auth, firestore, analytics };

export default app;  // Export the app instance
