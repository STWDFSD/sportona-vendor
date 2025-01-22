import { LoginUser, RegisterUser } from '../firebase/Auth';
import { AuthErrorMessages } from '../firebase/errorMessages';
import toast from 'react-hot-toast';
import { updateProfile } from 'firebase/auth';
import { db } from 'firebaseConfig';
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
const useAuth = () => {
  const loginUser = async data => {
    try {
      const user = await LoginUser(data.email, data.password);
      localStorage.setItem('loginTime', Date.now());
      return {
        id: user?.uid,
        email: user?.email,
        status: true,
      };
    } catch (error) {
      toast.error(AuthErrorMessages(error.code));
      return false;
    }
  };

  const createMerchantData = (data, user) => ({
    email: data.email,
    code: data.country,
    createdAt: Timestamp.now().toMillis(),
    id: user.uid,
    uid: user.uid,
    isActive: true,
    isDeleted: false,
    isOnLine: false,
    lastLogin: Timestamp.now().toMillis(),
    lastUpdated: Timestamp.now().toMillis(),
    name: '',
    profileCompleted: false,
    serviceCompleted: false,
    addTrainer: false,
    addBatch: false,
    addHall: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const registerUser = async data => {
    try {
      const user = await RegisterUser(data.email, data.password);
      await updateProfile(user, { email: data.email });
      const merchant = createMerchantData(data, user);
      const merchantRef = await addDoc(collection(db, 'merchants'), merchant);

      toast.success(
        'Registration Successful. Welcome! Your account has been created.'
      );
      return true;
    } catch (error) {
      toast.error(`Registration Failed: ${AuthErrorMessages(error.code)}`);
      return false;
    }
  };

  return { loginUser, registerUser };
};

export default useAuth;
