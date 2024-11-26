// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJLQa6MPImi3EAhO15eTGWOWRO_5rYB_o",
  authDomain: "miniblog-87396.firebaseapp.com",
  projectId: "miniblog-87396",
  storageBucket: "miniblog-87396.appspot.com",
  messagingSenderId: "978885968342",
  appId: "1:978885968342:web:18b82ba868000a9e4da477",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, app };
