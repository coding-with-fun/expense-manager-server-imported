/**
 * @author Coderc
 * @description ToDo Model.
 */

const mongoose = require('mongoose');

const ToDoSchema = mongoose.Schema(
    {
        content: {
            type: String,
            trim: true,
            required: true,
        },

        isCompleted: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamp: true }
);

module.exports = ToDo = mongoose.model('ToDo', ToDoSchema);
