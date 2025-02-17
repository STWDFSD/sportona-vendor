import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
export const LoginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw error;
  }
};

export const RegisterUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw error;
  }
};

export const ForgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent successfully!");
  } catch (error) {
    throw error;
  }
};