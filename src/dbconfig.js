import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    deleteDoc,
    doc,
    updateDoc,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDMDPAcqYy_9UYIOw9JkShghUoEkVReyYQ',
    authDomain: 'grocery-list-9a69f.firebaseapp.com',
    projectId: 'grocery-list-9a69f',
    storageBucket: 'grocery-list-9a69f.appspot.com',
    messagingSenderId: '849707778269',
    appId: '1:849707778269:web:79236620bd9d496cb0db34',
};

// init firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
export const colRefForGroceries = collection(db, 'groceries');

export const deleteItem = async (id) => {
    const docRef = doc(db, 'groceries', id);
    try {
        const response = await deleteDoc(docRef);
        if (response) {
            console.log(response);
        }
    } catch (err) {
        console.log(err.message);
    }
};

export const updateItem = async (id, checked) => {
    const docRef = doc(db, 'groceries', id);
    try {
        const response = await updateDoc(docRef, { checked: checked });
        if (response) {
            console.log(response);
        }
    } catch (err) {
        console.log(err.message);
    }
};
