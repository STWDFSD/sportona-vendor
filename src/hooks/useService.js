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

const useService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const countActiveTraineesInService = async (
    serviceRef,
    purchasedServicesCollectionRef
  ) => {
    try {
      const collectionRef = collection(db, purchasedServicesCollectionRef);

      const q = query(
        collectionRef,
        where('serviceRef', '==', serviceRef),
        where('status', '==', 'active')
      );

      const querySnapshot = await getDocs(q);
      const activeTraineesCount = querySnapshot.size;
      let revenue = 0;
      if (activeTraineesCount) {
        querySnapshot.forEach(item => (revenue += item?.data()?.price?.price));
      }

      return { success: true, count: activeTraineesCount, revenue };
    } catch (err) {
      console.error('Error counting active trainees:', err);
      return { success: false, error: err.message };
    }
  };

  const countBidsForService = async (serviceRef, bidsCollectionRef) => {
    try {
      const collectionRef = collection(db, bidsCollectionRef);

      const q = query(collectionRef, where('serviceRef', '==', serviceRef));

      const querySnapshot = await getDocs(q);
      const bidsCount = querySnapshot.size;

      return { success: true, count: bidsCount };
    } catch (err) {
      console.error('Error counting bids so far:', err);
      return { success: false, error: err.message };
    }
  };

  return {
    loading,
    error,
    countActiveTraineesInService,
    countBidsForService,
  };
};

export default useService;
