import { useState } from 'react';
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

const useDocument = collectionName => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDocByRef = async docRef => {
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        };
      } else {
        console.log('Document does not exist');
        return null;
      }
    } catch (error) {
      console.error('Error in getDocByRef:', error);
      throw error;
    }
  };

  // Fetch all docs in a collection
  const fetchCollection = async collectionName => {
    try {
      setLoading(true);
      const collectionRef = collection(db, collectionName);
      const querySnapshot = await getDocs(collectionRef);

      if (!querySnapshot.empty) {
        const documents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoading(false);
        return { result: true, data: documents };
      } else {
        setLoading(false);
        return { result: false, data: [] }; // No documents found
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(err);
    }
  };

  // Fetch a single document by document ID
  const fetchDocument = async docId => {
    try {
      setLoading(true);
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLoading(false);
        return { result: true, id: docSnap.id, ...docSnap.data() };
      } else {
        setLoading(false);
        return { result: false };
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(err);
    }
  };

  const fetchUserById = async uid => {
    try {
      const collectionRef = collection(db, collectionName);
      const userQuery = query(collectionRef, where('id', '==', uid));
      const querySnapshot = await getDocs(userQuery);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { success: true, data: doc.data() };
      } else {
        return { success: false, message: 'Document not found' };
      }
    } catch (err) {
      console.error('Error fetching document:', err);
      return { success: false, error: err.message };
    }
  };

  const createDocument = async (data, docId = null) => {
    try {
      let docRef;
      const collectionRef = collection(db, collectionName);

      if (docId) {
        docRef = doc(db, collectionName, docId);
        await setDoc(docRef, {
          ...data,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          id: docId,
        });
      } else {
        docRef = await addDoc(collectionRef, {
          ...data,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        await setDoc(docRef, {
          ...data,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          id: docRef.id,
        });
      }

      return { success: true, id: docRef.id };
    } catch (err) {
      console.error(err);
      setError(err);
      return { success: false };
    }
  };

  const updateDocument = async (docId, data) => {
    try {
      const docRef = doc(db, collectionName, docId);
      await setDoc(
        docRef,
        {
          ...data,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      return { success: true };
    } catch (err) {
      console.log(err);
      setError(err);
      return { success: false };
    }
  };

  return {
    loading,
    error,
    fetchDocument,
    createDocument,
    fetchUserById,
    updateDocument,
    fetchCollection,
    getDocByRef,
  };
};

export default useDocument;
