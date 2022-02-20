// import styles from './styles.css';
import { useState, useEffect } from 'react';
import { app, database } from '../firebase/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import React from 'react';

const examplepage = () => {
  // get collection ( the database object , database name )
  const dbInstance = collection(database, 'notes');
  const [isInputVisible, setInputVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDesc, setNoteDesc] = useState('');

  // 
  useEffect(() => {
    getNotes();
  }, []);
  //
  const inputToggle = () => {
    setInputVisible(!isInputVisible);
  };
  //
  const addDesc = (value) => {
    setNoteDesc(value);
  };
  // addDoc ( )
  const saveNote = () => {
    addDoc(dbInstance, {
      noteTitle: noteTitle,
      noteDesc: noteDesc,
    }).then(() => {
      setNoteDesc('');
      setNoteTitle('');
    });
  };
  const getNotes = () => {
    getDocs(dbInstance).then((data) => {
      console.log(data);
    });
  };

  return (
    <>
      <div className={styles.btnContainer}>
        <button onClick={inputToggle} className={styles.button}>
          Toggle Add a New Note
        </button>
      </div>

      {isInputVisible ? (
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            placeholder="Enter the Title.."
            onChange={(e) => setNoteTitle(e.target.value)}
            value={noteTitle}
          />
          <div className={styles.ReactQuill}>
            <ReactQuill
              onChange={addDesc}
              // value={noteDesc}
            />
          </div>
          <button onClick={saveNote} className={styles.saveBtn}>
            Save Note
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default examplepage;
