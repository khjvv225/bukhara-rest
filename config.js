// Firebase konfiguratsiyasi
const firebaseConfig = {
  apiKey: "AIzaSyAaUGfGuawwHE5jFJ9-O3M9jZGHw-rt9V4",
  authDomain: "bukhara-rest-uz.firebaseapp.com",
  projectId: "bukhara-rest-uz",
  storageBucket: "bukhara-rest-uz.firebasestorage.app",
  messagingSenderId: "419876967893",
  appId: "1:419876967893:web:feb38a222a5f4c8299995c",
  measurementId: "G-HSSPDREQPR"
};

// Firebase-ni ishga tushirish
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// Admin email (o'zgartirmang)
const ADMIN_EMAIL = "admin@bukhararest.uz";
