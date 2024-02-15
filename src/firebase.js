import { initializeApp } from "firebase/app";
import { doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiCzBjOldjfwl45DsxF53BgSCChBLEWHk",
  authDomain: "tutorly-3107d.firebaseapp.com",
  projectId: "tutorly-3107d",
  storageBucket: "tutorly-3107d.appspot.com",
  messagingSenderId: "448006449878",
  appId: "1:448006449878:web:711f119cbadaefe6e6b777",
  measurementId: "G-CVPL6BB5DV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };

export const updateUserProfile = async (userId, updatedData) => {
  try {
    // Update the user profile in the Firestore document
    const userDocRef = doc(firestore, "students", userId);
    await updateDoc(userDocRef, updatedData);
    console.log("Profile updated successfully!");
  } catch (error) {
    throw new Error("Error updating user profile: " + error.message);
  }
};
