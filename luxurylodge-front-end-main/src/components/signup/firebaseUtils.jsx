// firebaseUtils.js
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { firebaseApp } from './firebase';

export const getUserDataAndProfilePic = async (uid) => {
  
  const db = getFirestore(firebaseApp);
  const userDocRef = doc(db, 'Users', uid);

  try {
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      const profilePic = userData ? userData.profilePic : null;


      return { userData, profilePic };
    } else {
     
      return null;
    }
  } catch (error) {
  
    throw error;
  }
};


