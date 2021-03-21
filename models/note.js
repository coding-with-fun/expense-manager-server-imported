/**
 * @author Coderc
 * @description Note Model.
 */

const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
        },

        content: {
            type: String,
            trim: true,
            required: true,
        },
    },
    { timestamp: true }
);

module.exports = Note = mongoose.model('Note', NoteSchema);
