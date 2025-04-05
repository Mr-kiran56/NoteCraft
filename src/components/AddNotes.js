import React, { useContext, useState } from "react";
import NoteContext from "../context/notecontext";



const AddNotes = (props) => {
  const {setAlert}=props
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const addNoteClick = async (e) => {
    e.preventDefault();
    if (note.title.trim() && note.description.trim()) {
      await addNote(note.title, note.description, note.tag || "General"); 
      setAlert("Notes Added Successfully !!!","success")
      document.title="Note Added !"
      setTimeout(() => {
        document.title="iNoteBook"
      }, 2000);
      // Ensure a default tag
      setNote({ title: "", description: "", tag: "" }); 
      // Clear form after adding note
    } else {
      alert("Title and Description are required!");
    }
  };

  return (
    <div className="container add-notes shadow-lg p-5 pt-4 mt-5">
      <h1 className="mb-3">𝐂𝐚𝐩𝐭𝐮𝐫𝐞 𝐘𝐨𝐮𝐫 𝐓𝐡𝐨𝐮𝐠𝐡𝐭𝐬</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Notes Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Notes Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={note.description}
            onChange={onChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Notes Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn add-notebtn" 
   
        onClick={addNoteClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNotes;


