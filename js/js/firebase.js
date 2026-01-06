import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDgoq2rMU5kiKcz_27-hjBzd8rxS8yQqdY",
  authDomain: "xime-leave-system-b25a4.firebaseapp.com",
  projectId: "xime-leave-system-b25a4",
  storageBucket: "xime-leave-system-b25a4.firebasestorage.app",
  messagingSenderId: "802112635142",
  appId: "1:802112635142:web:0fd0f5ad1ae3ef8eb4de87"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
