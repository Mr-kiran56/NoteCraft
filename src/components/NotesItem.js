import React, { useContext, useState } from "react";
import "../App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NoteContext from "../context/notecontext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const NotesItem = ({ note, updatenotes, setAlert, isExpanded, onClick }) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speech, setSpeech] = useState(null);

  const text = `${note.title}. ${note.tag}. ${note.description}`;

  const toggleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      document.title = "iNoteBook";
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {
        setIsSpeaking(false);
        document.title = "iNoteBook";
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        document.title = "iNoteBook";
      };
      
      window.speechSynthesis.speak(utterance);
      setSpeech(utterance);
      setIsSpeaking(true);
      document.title = "Speak Mode Activated";
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    // Stop speech if playing when deleting
    if (isSpeaking) {
      window.speechSynthesis.cancel();
    }
    deleteNote(note._id);
    document.title = "Note Deleted !!";
    setTimeout(() => {
      document.title = "iNoteBook";
    }, 2000);
    setAlert("Note deleted successfully!", "danger");
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (isSpeaking) {
      window.speechSynthesis.cancel();
    }
    updatenotes(note);
  };

  return (
    <div 
      className={`col-md-${isExpanded ? "10" : "3"} d-flex justify-content-center mx-1`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div
        className={`card item-card note-card shadow-lg rounded-4 border-0 p-3 ${isExpanded ? "expanded-note" : ""}`}
        style={{
          width: isExpanded ? "100%" : "20rem",
          background: "linear-gradient(135deg, rgba(173, 216, 230, 0.7), rgba(0, 0, 255, 0.4))",
          transition: "all 0.3s ease"
        }}
      >
        <div className="card-body d-flex flex-column align-items-start w-100">
          <div className="w-100 d-flex justify-content-end mb-2">
            <i
              className="fa-solid fa-pen-to-square fs-5 me-3 text-success icon-button"
              onClick={handleEditClick}
            ></i>
            <i
              className="fa-solid fs-5 fa-trash text-danger icon-button"
              onClick={handleDeleteClick}
            ></i>
          </div>
          <h5 className="card-title w-100">{note.title}</h5>
          <span className="text-secondary w-100">{note.tag}</span>
          <pre
            className="card-text w-100"
            style={{
              whiteSpace: "normal",
              wordWrap: "break-word",
              overflow: "hidden",
              maxHeight: isExpanded ? "none" : "150px"
            }}
          >
            {note.description}
          </pre>
        </div>
        <div className="d-flex here-voiceover justify-content-end">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleSpeak();
            }}
            className="btn btn-link p-0"
            aria-label={isSpeaking ? "Stop speech" : "Read note aloud"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              height="24px" 
              viewBox="0 -960 960 960" 
              width="24px" 
              fill={isSpeaking ? "green" : "black"}
            >
              <path d="M280-80q62 0 101.5-31t60.5-91q17-50 32.5-70t71.5-64q62-50 98-113t36-151q0-119-80.5-199.5T400-880q-119 0-199.5 80.5T120-600h80q0-85 57.5-142.5T400-800q85 0 142.5 57.5T600-600q0 68-27 116t-77 86q-52 38-81 74t-43 78q-14 44-33.5 65T280-160q-33 0-56.5-23.5T200-240h-80q0 66 47 113t113 47Zm432-210q59-60 93.5-139.5T840-600q0-92-34.5-172T712-912l-58 56q50 50 78 115.5T760-600q0 74-28 139t-78 115l58 56ZM400-500q42 0 71-29.5t29-70.5q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 41 29 70.5t71 29.5Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesItem;