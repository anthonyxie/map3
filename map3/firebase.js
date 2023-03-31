// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// App's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLwo1J3jta73tYBloqrC-JD8eDdOz39O8",
  authDomain: "cs194w-3b475.firebaseapp.com",
  projectId: "cs194w-3b475",
  storageBucket: "cs194w-3b475.appspot.com",
  messagingSenderId: "179405672643",
  appId: "1:179405672643:web:26fe729516f1658f821276",
  databaseURL: "https://cs194w-3b475-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;