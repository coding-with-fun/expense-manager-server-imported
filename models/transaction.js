/**
 * @author Coderc
 * @description ToDo Model.
 */

const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
        },

        description: {
            type: String,
            trim: true,
            required: true,
        },

        category: {
            type: String,
            trim: true,
            required: true,
        },

        amount: {
            type: Number,
            trim: true,
            required: true,
        },

        date: {
            type: String,
            trim: true,
            required: true,
        },
    },
    { timestamp: true }
);

module.exports = Transaction = mongoose.model('Transaction', TransactionSchema);
