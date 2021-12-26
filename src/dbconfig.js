import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';

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
export const colRef = collection(db, 'groceries');

// get collection data
// getDocs(colRef)
//     .then((snapshot) => {
//         // console.log(snapshot.docs)
//         let books = [];
//         snapshot.docs.forEach((doc) => {
//             books.push({ ...doc.data(), id: doc.id });
//         });
//         console.log(books);
//     })
//     .catch((err) => {
//         console.log(err.message);
//     });
