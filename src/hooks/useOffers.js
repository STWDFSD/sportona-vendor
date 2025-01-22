import { useState } from 'react';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from 'firebaseConfig';

const useOffers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCustomOffersCount = async (vendorRef, collectionName) => {
    setLoading(true);
    setError(null);
    try {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, where('vendorRef', '==', vendorRef));
      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  const getAllOffersWithDetails = async (vendorRef, collectionName) => {
    try {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, where('vendorRef', '==', vendorRef));
      const querySnapshot = await getDocs(q);
      const offers = await Promise.all(
        querySnapshot.docs.map(async docSnapshot => {
          const data = docSnapshot.data();
          const serviceDocRef = data.serviceRef;
          const serviceDoc = serviceDocRef ? await getDoc(serviceDocRef) : null;
          const userDocRef = data.userRef;
          const userDoc = userDocRef ? await getDoc(userDocRef) : null;
          const batchDocRef = data?.batchRef;
          const batchDoc = userDocRef ? await getDoc(batchDocRef) : null;
          const activityDocRef = serviceDoc?.data().activityRef || null;
          const activityDoc = userDocRef ? await getDoc(activityDocRef) : null;

          return {
            id: docSnapshot.id,
            ...data,
            serviceDetails: serviceDoc?.exists()
              ? { id: serviceDoc.id, ...serviceDoc.data() }
              : null,
            userDetails: userDoc?.exists()
              ? { id: userDoc.id, ...userDoc.data() }
              : null,
            batchDetails: batchDoc?.exists()
              ? {
                  id: batchDoc.id,
                  ...batchDoc.data(),
                }
              : null,
            activtyDetails: activityDoc?.exists()
              ? {
                  id: activityDoc.id,
                  ...activityDoc.data(),
                }
              : null,
          };
        })
      );

      return offers;
    } catch (err) {
      console.error('Error fetching offers:', err);
    }
  };

  const getAllSubscriptions = async (vendorRef, collectionName) => {
    try {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, where('vendorRef', '==', vendorRef));
      const querySnapshot = await getDocs(q);

      const subscriptions = await Promise.all(
        querySnapshot.docs.map(async docSnapshot => {
          const data = docSnapshot.data();
          const serviceDocRef = data.serviceRef;
          const serviceDoc = serviceDocRef ? await getDoc(serviceDocRef) : null;
          const userDocRef = data.userRef;
          const userDoc = userDocRef ? await getDoc(userDocRef) : null;
          const batchDocRef = data?.batchRef;
          const batchDoc = userDocRef ? await getDoc(batchDocRef) : null;
          const activityDocRef = serviceDoc?.data().activityRef || null;
          const activityDoc = userDocRef ? await getDoc(activityDocRef) : null;

          return {
            id: docSnapshot.id,
            ...data,
            serviceDetails: serviceDoc?.exists()
              ? { id: serviceDoc.id, ...serviceDoc.data() }
              : null,
            userDetails: userDoc?.exists()
              ? { id: userDoc.id, ...userDoc.data() }
              : null,
            batchDetails: batchDoc?.exists()
              ? {
                  id: batchDoc.id,
                  ...batchDoc.data(),
                }
              : null,
            activtyDetails: activityDoc?.exists()
              ? {
                  id: activityDoc.id,
                  ...activityDoc.data(),
                }
              : null,
          };
        })
      );

      return subscriptions;
    } catch (err) {
      console.error('Error fetching offers:', err);
    }
  };

  return {
    loading,
    error,
    getCustomOffersCount,
    getAllOffersWithDetails,
    getAllSubscriptions,
  };
};

export default useOffers;
