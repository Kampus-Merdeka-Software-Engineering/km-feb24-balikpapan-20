import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {getFirestore, setDoc,getDoc, doc} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyDT_AvkKXdz7bpBU0nd9NmqWvF_Y3RKXog",
  authDomain: "maven-roaster.firebaseapp.com",
  projectId: "maven-roaster",
  storageBucket: "maven-roaster.appspot.com",
  messagingSenderId: "1072729075137",
  appId: "1:1072729075137:web:d01a95efea6bfe32009340"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);


const signout = document.getElementById('sign-out');

signout.addEventListener('click',function(){
    
    localStorage.removeItem('loggedInUserId');
    signOut(auth);
    window.location.href='index.html'
    
  })