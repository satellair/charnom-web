// import styles from "../styles/";
import { useState, useEffect } from "react";
import { database } from "../firebaseConfig.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
// import ReactQuill, { Quill } from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const ReactQuill =
//   typeof window === "object" ? require("react-quill") : () => false;

export default function NoteOperations() {
  // collection to connect to database and collection
  const dbInstance = collection(database, "notes");
  const [isInputVisible, setInputVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");
  const [notesArray, setNotesArray] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const inputToggle = () => {
    setInputVisible(!isInputVisible);
  };
  const addDesc = (value) => {
    setNoteDesc(value);
  };
  // addDoc to send document(the row of data) to database
  const saveNote = () => {
    addDoc(dbInstance, {
      noteTitle: noteTitle,
      noteDesc: noteDesc,
    }).then(() => {
      setNoteDesc("");
      setNoteTitle("");
      getNotes();
    });
  };
  // getDocs to get all the data from database then map the item to split in to array
  const getNotes = () => {
    getDocs(dbInstance).then((data) => {
      setNotesArray(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  return (
    <>
      <div className={styles.btnContainer}>
        <button
          onClick={() => {
            getNotes();
          }}
        >
          Activate getNotes
        </button>
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
            {/* <ReactQuill onChange={addDesc} value={noteDesc} /> */}
          </div>
          <button onClick={saveNote} className={styles.saveBtn}>
            Save Note
          </button>
        </div>
      ) : (
        <></>
      )}

      <div className={styles.notesDisplay}>
        {notesArray.map((note) => {
          return (
            <div className={styles.notesInner}>
              <h4>{note.noteTitle}</h4>
              <p>{note.noteDesc}</p>
              <div dangerouslySetInnerHTML={{ __html: note.noteDesc }}></div>
            </div>
          );
        })}
      </div>
    </>
  );
}