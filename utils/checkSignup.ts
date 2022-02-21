import { database } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { async } from '@firebase/util';

type LoginFormInputs = {
  email: string;
  password: string;
};

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
};

export const checkSignup = async (data: RegisterFormInputs): Promise<string> => {
  const custInstance = collection(database, 'customers');
  const custQuery = query(custInstance, where('email', '==', data.email));
  const querySnapshot = await getDocs(custQuery);
  if (querySnapshot.size) {
    return '-1';
  }
  addDoc(custInstance, {...data})
  return '1';
}