import { useState } from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from 'firebaseConfig';

const useVendor = collectionName => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchServicesByVendor = async vendorRefPath => {
    try {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, where('vendorRef', '==', vendorRefPath));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const documents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoading(false);
        return { success: true, data: documents };
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(err);
      return { success: false, error: err.message };
    }
  };

  const fetchVenderById = async (collectionName, docId) => {
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLoading(false);
        return { result: true, id: docSnap.id, ...docSnap.data() };
      } else {
        setLoading(false);
        return { result: false };
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchServicesByVendor,
    fetchVenderById,
  };
};

export default useVendor;
