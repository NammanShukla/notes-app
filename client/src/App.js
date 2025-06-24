import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/notes';

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
    <div style={{ padding: '20px' }}>
      <h2>Notes</h2>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a note"
      />
      <button onClick={addNote}>Add</button>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            {note.text}
            <button onClick={() => deleteNote(note._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
