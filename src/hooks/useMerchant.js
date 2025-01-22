import { useState } from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

const useMerchant = () => {
  const collectionName = 'merchants';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateMerchant = async (merchantId, data) => {
    try {
      setLoading(true);

      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, where('uid', '==', merchantId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await setDoc(
          docRef,
          {
            ...data,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        return { success: false, message: 'No merchant found with that ID' };
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(err);
      return { success: false, error: err.message };
    }
  };

  return {
    loading,
    error,
    updateMerchant,
  };
};

export default useMerchant;
