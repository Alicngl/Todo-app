import {initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBPzdrxfZoISNQeZrHYGtR0dz6yg_xyMvo",
    authDomain: "modern-react-app-9bf56.firebaseapp.com",
    projectId: "modern-react-app-9bf56",
    storageBucket: "modern-react-app-9bf56.appspot.com",
    messagingSenderId: "1015475790763",
    appId: "1:1015475790763:web:35fa9fdaccec81c099e8ee"
};

initializeApp(firebaseConfig)

const db=getFirestore()
const auth=getAuth()
const provider=new GoogleAuthProvider()

export {db,auth,provider}