import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBFlfhqPnLXChdqPs-sGiN0fT0Bjz30kaA",
  authDomain: "mia-tex.firebaseapp.com",
  projectId: "mia-tex",
  storageBucket: "mia-tex.firebasestorage.app",
  messagingSenderId: "158171170726",
  appId: "1:158171170726:web:415923b11136fa022af167"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);