import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyA_XaVATUplN5w_jffRCkOQlL21ojk1eTA",
  authDomain: "utak-crud-11b3d.firebaseapp.com",
  databaseURL: "https://utak-crud-11b3d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "utak-crud-11b3d",
  storageBucket: "utak-crud-11b3d.appspot.com",
  messagingSenderId: "22731223178",
  appId: "1:22731223178:web:3c90cc40f8670f4894bd73",
  measurementId: "G-GE1VMZ7MHF"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
