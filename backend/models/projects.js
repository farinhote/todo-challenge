const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    done: {
        type: Boolean,
        required: true
    },
    creationDate: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

const ProjectSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    ownerId: {
        type: String,
        required: true,
    },
    tasks: [TaskSchema]
});

module.exports = mongoose.model('Project', ProjectSchema)