import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/header';
import './App.css';
import {FaTrash} from 'react-icons/fa';

const API = 'http://localhost:5000/notes';
const stickyColors = ['#fffa65', '#ffb6b6', '#caffbf', '#b5ead7', '#a0c4ff', '#ffd6a5'];

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');

  const fetchNotes = async () => {
    const res = await axios.get(API);
    setNotes(res.data);
  };

  const addNote = async () => {
    if (!text) return;
    await axios.post(API, { text });
    setText('');
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="input-container">
        <textarea
          className="note-textarea"
          placeholder="Write your sticky note here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addNote} className="add-button">Add Note</button>
      </div>
      <div className="notes-container">
        {notes.map((note, i) => (
          <div
            key={note._id}
            className="note"
            style={{ backgroundColor: stickyColors[i % stickyColors.length] }}
          >
            <p>{note.text}</p>
            <button onClick={() => deleteNote(note._id)} className="delete-btn">
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
