import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import NotesItem from "./NotesItem";
import NoteContext from "../context/notecontext";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

const Notes = ({ setAlert }) => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNotes } = context;
  const modalRef = useRef(null);
  const navigate = useNavigate();
  
  const [note, setNote] = useState({ 
    id: "", 
    etitle: "", 
    edescription: "", 
    etag: "" 
  });
  
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [showAllNotes, setShowAllNotes] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  // Filter notes based on search term
  useEffect(() => {
    const filtered = notes.filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (note.tag && note.tag.toLowerCase().includes(searchTerm.toLowerCase()))||(note.description && note.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredNotes(filtered);
  }, [notes, searchTerm]);

  // Debounced search handler
  const handleSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term);
    }, 300),
    []
  );

  // Get notes on mount
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, [getNotes, navigate]);

  // Rotating AI messages
  useEffect(() => {
    const aiTextElement = document.querySelector(".about-ai");
    if (aiTextElement) {
      const messages = [
        "<h4>AI-Assisted Note Creation – Helps generate, refine, and structure notes effortlessly.</h4>",
        "<h4>Smart Summarization – Condenses long notes into key points for better readability.</h4>",
        "<h4>Idea Enhancement – Provides suggestions to expand and improve note content.</h4>",
        "<h4>Automatic Organization – Categorizes notes based on topics and themes.</h4>",
        "<h4>Time-Saving & Efficient – Speeds up note-taking with AI-powered assistance.</h4>"
      ];
      
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        aiTextElement.innerHTML = messages[currentIndex];
        currentIndex = (currentIndex + 1) % messages.length;
      }, 2000);

      return () => clearInterval(intervalId);
    }
  }, []);

  const updatenotes = (currentNote) => {
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });

    const modalInstance = new bootstrap.Modal(modalRef.current);
    modalInstance.show();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    
    if (!note.etitle.trim() || !note.edescription.trim()) {
      setAlert("Title and description cannot be empty!", "danger");
      return;
    }

    document.title = "Note Updated!!";
    setTimeout(() => {
      document.title = "iNoteBook";
    }, 2000);

    editNotes(note.id, note.etitle, note.edescription, note.etag);
    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalRef.current);
    if (modalInstance) modalInstance.hide();

    setAlert("Note updated successfully!", "success");
  };

  const handleNoteClick = (noteId) => {
    setSelectedNoteId(noteId);
    setShowAllNotes(false);
  };

  const handleBackClick = () => {
    setSelectedNoteId(null);
    setShowAllNotes(true);
  };

  const notesToDisplay = showAllNotes ? filteredNotes : 
    filteredNotes.filter(note => note._id === selectedNoteId);

  return (
    <>
      {/* Edit Modal */}
      <div className="modal fade" ref={modalRef} tabIndex="-1" aria-labelledby="editNoteModalLabel" aria-hidden="true">
        <div className="modal-dialog edit-modal">
          <div className="modal-content edit-modal">
            <div className="modal-header">
              <h5 className="modal-title" id="editNoteModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Note Title</label>
                  <input
                    type="text"
                    className="form-control form-border"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Note Description</label>
                  <textarea
                    className="form-control form-border"
                    id="edescription"
                    name="edescription"
                    rows="3"
                    value={note.edescription}
                    onChange={onChange}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Note Tag</label>
                  <input
                    type="text"
                    className="form-border form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" className="btn update-btn">
                    Update Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="home-notes">
        {/* AI Info Section */}
        <div className="text-center mt-5">
          <div className="d-flex align-items-center justify-content-center">
            <h1 className="head-ai me-2">About  <span className="title">  AI CreerBot</span> and Notes</h1>
            <svg className="bot" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="green">
            <rect x="5" y="7" width="14" height="10" rx="2" fill="white" stroke="black" strokeWidth="1.5" />
            <circle cx="9" cy="12" r="1.5" fill="black" />
            <circle cx="15" cy="12" r="1.5" fill="black" />
            <rect x="11" y="3" width="2" height="3" fill="black" />
            <rect x="4" y="9" width="2" height="6" fill="black" />
            <rect x="18" y="9" width="2" height="6" fill="black" />
            <path d="M8 16c2 3 6 3 8 0" stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
          </div>
          <div className="about-ai fs-1" aria-live="polite"></div>
        </div>

        <p className="text-muted fs-4 text-center">
          Start capturing your thoughts! Our AI Creer Bot is here to help you generate and refine ideas effortlessly.
        </p>
        
        <div className="rows">
          <h1 className="text-center mt-5">Your Notes</h1>

          <div className="d-flex justify-content-end me-5 mt-5">
            <div className="d-flex searchbtn" style={{ width: '350px',marginRight:'100px',height:'42px' }}>
              <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Search" 
                aria-label="Search notes"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button className="btn btn-outline-success" type="button">
                Search
              </button>
            </div>
          </div>
        </div>

        {!showAllNotes && (
          <div className="text-center back-notesbtn mb-3">
            <button 
              className="btn btn-warning"
              onClick={handleBackClick}
              aria-label="Back to all notes"
            >
              ← Back to All Notes
            </button>
          </div>
        )}

        <div className="row justify-content-center">
          {notesToDisplay.length === 0 ? (
            <div className="text-center text-dark mt-5">
              <h3>No notes found!</h3>
            </div>
          ) : (
            notesToDisplay.map((note) => (
              <NotesItem 
                key={note._id} 
                note={note} 
                setAlert={setAlert} 
                updatenotes={updatenotes}
                onClick={() => handleNoteClick(note._id)}
                isExpanded={!showAllNotes}
              />
            ))
          )}
        </div>
        <div style={{height: '230px'}} aria-hidden="true"></div>
      </div>
    </>
  );
};

export default Notes;