import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBFlfhqPnLXChdqPs-sGiN0fT0Bjz30kaA",
  authDomain: "mia-tex.firebaseapp.com",
  projectId: "mia-tex",
  storageBucket: "mia-tex.firebasestorage.app",
  messagingSenderId: "158171170726",
  appId: "1:158171170726:web:415923b11136fa022af167"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);

        window.location.href = "dashboard.html";

    } catch (error) {
        alert("Correo o contraseña incorrectos");
        console.log(error);
    }
});