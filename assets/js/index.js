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



const dasboard =document.getElementById('dashboard')
const closeL = document.querySelectorAll('.close')[0];
const closeR = document.querySelectorAll('.close')[1];
const openSignIn  =document.getElementById('loginModal')
const openSignup  =document.getElementById('registerModal')
const submitLogin = document.getElementById('submitLogin');
const submitRegister = document.getElementById('submitRegister');


//close modal login register
closeL.addEventListener('click', function() {
  openSignIn.style.display = 'none';
});


closeR.addEventListener('click', function() {
  openSignup.style.display = 'none';
});

window.addEventListener('click', function(event) {
  if (event.target === openSignIn) {
    openSignIn.style.display = 'none';
  }else if(event.target === openSignup){
    openSignup.style.display = 'none';
  }
});



// open modal login jika belum login
dasboard.addEventListener('click', function(){
  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
      console.log(user);
      const docRef = doc(db,"users",loggedInUserId);
      getDoc(docRef)
      .then((docSnap)=>{
        
          const userData= docSnap.data();
          if(userData.role == 'admin'){
            window.location.href='dashboard.html'
          }else{
            localStorage.removeItem('loggedInUserId');
            signOut(auth);
            alert('anda bukan admin')
          }
      })
      .catch((error)=>{
        console.log(error);
      })
    }else{
       openSignIn.style.display = 'block'
       openSignup.style.display = 'none'
    }
  })
  
})





//open modal register
document.getElementById('openRegisterModal').addEventListener('click',function(){
  console.log('open modal');
  openSignIn.style.display = 'none'
  openSignup.style.display= 'block'
})


//submit register create account
submitRegister.addEventListener("click",function(event) {
  
  event.preventDefault();

  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const firstName = document.getElementById('firstname').value;
  const lastName = document.getElementById('lastname').value;

  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential)=>{
    const user = userCredential.user;
    const userData ={
      email :email,
      firstName : firstName,
      lastName : lastName,
      role : "user"
    };
    alert("created account");

    const docRef = doc(db, "users",user.uid);
    setDoc(docRef,userData)
    .then(()=>{

    openSignup.style.display = 'none';
    openSignIn.style.display = 'block'; 
    })
    .catch((error)=>{
     alert(error);
    })
  })
  .catch((error)=>{
    if(error.code === 'auth/email-already-in-use'){
      alert('email addres already exist!');
    }else{
      alert(error.code)
    }
  })
  
})

//submit login
submitLogin.addEventListener("click",function (event) {   
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const auth=getAuth();


signInWithEmailAndPassword (auth, email, password)
.then((userCredential) => {
  const user = userCredential.user;

  localStorage.setItem('loggedInUserId', user.uid);

  alert("login..")
  
  const docRef = doc(db,"users",user.uid);
  getDoc(docRef)
  .then((docSnap)=>{
      const role = docSnap.data().role
      if(role == 'admin'){
        window.location.href='dashboard.html'
      }else{
        alert('maaf anda bukan admin')
      }

  })
  
})
.catch((error) => {
   const errorCode = error.code;

  if(errorCode==='auth/invalid-credential'){
    alert('Incorrect Email or Password');
  }else{
    alert('Account does not Exist');
  }
});

})
