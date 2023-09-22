import { initializeApp } from 'firebase/app';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCBmM4h14OHVKIpF0w_2iSLt8J_XHMTo6c",
    authDomain: "itraproject-97c11.firebaseapp.com",
    projectId: "itraproject-97c11",
    storageBucket: "itraproject-97c11.appspot.com",
    messagingSenderId: "671630794590",
    appId: "1:671630794590:web:0b52ea3b690e8c25e279cf"
};

export const api = initializeApp(firebaseConfig);
export const storage = getStorage(api);
