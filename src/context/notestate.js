import React, { useState } from "react";
import NoteContext from "../context/notecontext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);
  // const intialnotes=[]

  // Fetch all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
    
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const newNote = await response.json();
      setNotes([...notes, newNote]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Edit a note
  const editNotes = async (id, title, description, tag) => {
    try {
      await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }),
      });

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, title, description, tag } : note
        )
      );
    } catch (error) {     console.error("Error updating note:", error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
