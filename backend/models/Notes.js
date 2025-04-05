const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
    },
    tag: {
        type: String,
        required: true  
    },
    title: {
        type: String,
        required: true  
    },
    description: {
        type: String,
        required: true 
    },
    date: {
        type: Date,
        required: true,  
        default: Date.now
    }
});


module.exports = mongoose.model('Note', notesSchema);
