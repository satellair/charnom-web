import { useState, useEffect } from 'react';
import { database } from '../firebase/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
// import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Container, Flex, Image } from '@chakra-ui/react';

export default function NoteOperations() {
  const dbInstance = collection(database, 'notes');
  const customersInstance = collection(database, 'customers');
  const productsInstance = collection(database, 'products');
  const ordersInstance = collection(database, 'orders');

  const [isInputVisible, setInputVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDesc, setNoteDesc] = useState('');

  const [productsList, setProductsList] = useState([]);

  const [notesArray, setNotesArray] = useState([]);

  useEffect(() => {
    getMenu();
  }, []);

  // const inputToggle = () => {
  //   setInputVisible(!isInputVisible);
  // };
  // const addDesc = (value:any) => {
  //   setNoteDesc(value);
  // };
  // addDoc to send document(the row of data) to database
  // const saveNote = () => {
  //   addDoc(productsInstance, {
  //     name: noteTitle,
  //     desc: noteDesc,
  //     price: 20,
  //     image: '',
  //   }).then(() => {
  //     setNoteDesc("");
  //     setNoteTitle("");
  //     getNotes();
  //   });
  // };
  // getDocs to get all the data from database then map the item to split in to array
  // const getNotes = () => {
  //   getDocs(productsInstance).then((data) => {
  //     setNotesArray(
  //       data.docs.map((item) => {
  //         return { ...item.data(), id: item.id };
  //       })
  //     );
  //   });
  // };

  const getMenu = () => {
    getDocs(productsInstance).then((products) => {
      setProductsList(
        //@ts-ignore
        products.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  return (
    <>
      <Container>
        {productsList.map((product:any) => {
          return (
            <>
              <Flex>{product.name}</Flex>
              <Image src={product.image} boxSize={200}/>
            </>
          );
        })}
        test
      </Container>
    </>
  );
}
