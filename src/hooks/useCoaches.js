import { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const useCoaches = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCoachesByVendorRef = async (
    vendorRefPath,
    coachesCollectionRef
  ) => {
    try {
      setLoading(true);
      const collectionRef = collection(db, coachesCollectionRef);
      const q = query(collectionRef, where('vendorRef', '==', vendorRefPath));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const coaches = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoading(false);
        return { success: true, data: coaches };
      } else {
        setLoading(false);
        return {
          success: false,
          message: 'No coaches found for the given vendor reference',
        };
      }
    } catch (err) {
      console.error('Error fetching coaches:', err);
      setLoading(false);
      setError(err);
      return { success: false, error: err.message };
    }
  };

  return {
    loading,
    error,
    fetchCoachesByVendorRef,
  };
};

export default useCoaches;
