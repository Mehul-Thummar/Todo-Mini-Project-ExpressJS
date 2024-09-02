const mongoose = require('mongoose');


const todoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    task:
        { type: String, unique: true },
    isComplete: {
        type: Boolean, default: false
    },
    isDelete: {
        type: Boolean, default: false
    }
}, {
    versionKey: false, timestamps: true
});

module.exports = mongoose.model('todos', todoSchema);