// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxFDS8afTDM2XDCpBRbKzbFXWInKGSC3Y",
  authDomain: "fir-auth-c42d7.firebaseapp.com",
  projectId: "fir-auth-c42d7",
  storageBucket: "fir-auth-c42d7.appspot.com",
  messagingSenderId: "876036415471",
  appId: "1:876036415471:web:4c1de140396d9968c5e01a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});


export { auth };
