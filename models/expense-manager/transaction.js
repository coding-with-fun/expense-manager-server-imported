/**
 * @author Coderc
 * @description Transaction Model.
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
            type: Number,
            trim: true,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = Transaction = mongoose.model('Transaction', TransactionSchema);
