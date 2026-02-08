const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    roomID: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    code: {
        type: String,
        default: 'Hello World!'
    },
    language: {
        type: String,
        default: 'javascript'
        
    },
    fileTree: {
        type: Object, // Stores the JSON tree structure
        default: {
            id: "root",
            name: "root",
            type: "folder",
            children: []
        }
    },
    collaborators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
module.exports = mongoose.model('project', projectSchema);
   