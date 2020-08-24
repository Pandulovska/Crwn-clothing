import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBrK1UQYfMyngzpL5Ut61N2-CWerhN6ZMU",
  authDomain: "crwn-db-5bd8b.firebaseapp.com",
  databaseURL: "https://crwn-db-5bd8b.firebaseio.com",
  projectId: "crwn-db-5bd8b",
  storageBucket: "crwn-db-5bd8b.appspot.com",
  messagingSenderId: "1073747606823",
  appId: "1:1073747606823:web:cd4e8a753a604525da3d02",
  measurementId: "G-96DWGLYP8D",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
