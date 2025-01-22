import { useState } from 'react';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const useBatch = collectionName => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBatchesByService = async servicePath => {
    try {
      setLoading(true);
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, where('serviceRef', '==', servicePath));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const documents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLoading(false);
        return { success: true, data: documents };
      } else {
        setLoading(false);
        return {
          success: false,
          message: 'No batches found for the given service reference',
        };
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(err);
      return { success: false, error: err.message };
    }
  };

  const fetchByTraineesByBatch = async (batchRef, traineesRef) => {
    try {
      const traineesQuery = query(
        collection(db, traineesRef),
        where('batchRef', '==', batchRef)
      );
      const querySnapshot = await getDocs(traineesQuery);

      const traineesWithUserData = [];

      for (const docSnap of querySnapshot.docs) {
        const purchasedService = docSnap.data();

        if (purchasedService.userRef) {
          // Fetch the user data using the userRef
          const userDocSnap = await getDoc(purchasedService.userRef);

          if (userDocSnap.exists()) {
            traineesWithUserData.push({
              purchasedServiceId: docSnap.id,
              purchasedService,
              userData: userDocSnap.data(),
            });
          } else {
            console.error(
              'User document does not exist for:',
              purchasedService.userRef
            );
          }
        }
      }
      return traineesWithUserData;
    } catch (error) {
      console.error('Error fetching trainees by batch:', error);
      throw error;
    }
  };

  return {
    loading,
    error,
    fetchBatchesByService,
    fetchByTraineesByBatch,
  };
};

export default useBatch;
