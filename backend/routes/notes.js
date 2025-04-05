const express = require('express');
const router = express.Router();
const Note = require('../models/Notes.js');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fecthuser');

router.get('/fetchnotes',fetchuser,async(req,res)=>{
    try{
        const usernotes=await Note.find({user:req.user.id})
        res.json(usernotes)
    }catch(error){
        console.error(error)
        res.status(500).json({error:"internal error "})
    }
})

// Route to fetch notes
router.post(
  '/addnote',
  fetchuser, // ✅ Apply authentication middleware
  [
    body('title', 'Title must be at least 5 characters long').isLength({ min: 5 }),
    body('description', 'Description must be at least 10 characters long').isLength({ min: 10 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title,   description, tag } = req.body;

      // Create a new note
      const newNote = await Note({
        title,
        description,
        tag,
        user: req.user.id, // Assuming fetchuser middleware sets req.user.id
      });
     const newnote=await newNote.save()
      res.json(newnote);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error occurred' }); // ✅ Correct status code
    }
  }
);
//updating notes
// Updating notes
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // Create an object to hold updated fields
        let newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;

        // Find the note to be updated
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        // Ensure the user owns the note
        if (note.user.toString() !== req.user.id) {  // ✅ Fixed comparison
            return res.status(401).json({ error: "Unauthorized access" });
        }

        // Update the note
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

        res.json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//deleting the note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        
        // Find the note to be updated
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        // Ensure the user owns the note
        if (note.user.toString() !== req.user.id) {  // ✅ Fixed comparison
            return res.status(401).json({ error: "Unauthorized access" });
        }

        // Update the note
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ message: "Successfully deleted", note: note });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
