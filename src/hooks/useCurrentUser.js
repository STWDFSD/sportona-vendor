import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'firebaseConfig';

const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Subscribe to the Firebase Auth state change listener
    const unsubscribe = onAuthStateChanged(
      auth,
      user => {
        if (user) {
          setUser(user); // Set the user if authenticated
        } else {
          setUser(null); // Clear the user if not authenticated
        }
        setLoading(false); // Set loading to false once authentication state is resolved
      },
      err => {
        setError(err);
        setLoading(false);
      }
    );

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return { user, loading, error };
};

export default useCurrentUser;
