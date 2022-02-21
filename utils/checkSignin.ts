import { database } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

type LoginFormInputs = {
  email: string;
  password: string;
};

export const checkSignin = async (data: LoginFormInputs): Promise<string> => {
  const custInstance = collection(database, 'customers');
  const custQuery = query(custInstance, where('email', '==', data.email));
  const querySnapshot = await getDocs(custQuery);
  if (querySnapshot.size) {
    const userData = querySnapshot.docs[0].data();
    if (userData.password === data.password) {
      return '1';
    }
    return '-2';
  }
  return '-1';
}

export const getProfile = async (email: string) => {
  const querySnapshot = await getDocs(query(collection(database, 'customers'), where('email', '==', email)));
  return querySnapshot.docs[0].data();
}