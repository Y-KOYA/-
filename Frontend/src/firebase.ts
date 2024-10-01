import { getAuth } from "firebase/auth";
// import { initializeApp } from 'firebase/app';

// const firebaseConfig = {
//   apiKey: "AIzaSyDHhA1t-9e2dwQvkzY2x5SPjGjG9JktMyg",
//   authDomain: "section7-login.firebaseapp.com",
//   projectId: "section7-login",
//   storageBucket: "section7-login.appspot.com",
//   messagingSenderId: "320106132262",
//   appId: "1:320106132262:web:97fab1464dd216f957c7e7"
// };

// const app = initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyC03QDBs20Us3vHIfqVdEGefQiM8x8lJp8",
  authDomain: "section7-41742.firebaseapp.com",
  projectId: "section7-41742",
  storageBucket: "section7-41742.appspot.com",
  messagingSenderId: "526067398783",
  appId: "1:526067398783:web:a8de102c2b1fc77883e74a"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };