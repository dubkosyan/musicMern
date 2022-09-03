import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD5Rom082_Yv8n8wTNfE8IrXy0RlBOtANk",
  authDomain: "musicapp-bc4d3.firebaseapp.com",
  databaseURL: "https://musicapp-bc4d3-default-rtdb.firebaseio.com",
  projectId: "musicapp-bc4d3",
  storageBucket: "musicapp-bc4d3.appspot.com",
  messagingSenderId: "278957615517",
  appId: "1:278957615517:web:d7f2b0abeec264f688e774",
  measurementId: "G-DKTY8JTHQN"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage };
