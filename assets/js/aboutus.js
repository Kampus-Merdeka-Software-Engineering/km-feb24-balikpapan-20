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
const db=getFirestore(app);

const dasboard =document.getElementById('dashboard');
const buttonLogin =document.getElementById('login-btn');
const signout = document.getElementById('sign-out');

onAuthStateChanged(auth, (user)=>{
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
      document.getElementById('login-btn').style.display='none'
      const docRef = doc(db,"users",loggedInUserId);
      getDoc(docRef)
      .then((docSnap)=>{
        
          const userData= docSnap.data();
          if(userData){
            // window.location.href='dashboard.html'
            document.querySelector('.dropdown-login').style.display='inline-block'
          }else{
            localStorage.removeItem('loggedInUserId');
            signOut(auth);
          }
      })
      .catch((error)=>{
        console.log(error);
      })
    }else{
      document.querySelector('.dropdown-login').style.display='none'
      document.getElementById('login-btn').style.display = 'inline-block'
    }
  })

  dasboard.addEventListener('click',function(){
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        window.location.href='dashboard.html'
    }else{
        window.location.href='index.html'
    }
});

buttonLogin.addEventListener("click",function(){
      window.location.href='index.html'
  })

  signout.addEventListener('click',function(){
    
    alert("click")
    localStorage.removeItem('loggedInUserId');
    signOut(auth);
  })

// hamburger menu
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const navLinks = document.getElementById('nav-links');

  hamburgerMenu.addEventListener('click', () => {
      navLinks.classList.toggle('active');
  });
});