/**
 * @author Coderc
 * @description Transaction controller.
 */

require('colors');

const User = require('../models/user');
const Transaction = require('../models/transaction');

/**
 * @type        POST
 * @route       /api/transaction/add
 * @description Add New Transaction controller.
 * @access      Private
 */
exports.addTransaction = async (req, res) => {
    try {
        const userID = req.auth;

        const newTransaction = new Transaction(req.body);
        console.log('object', newTransaction);
        await newTransaction.save();

        await User.findByIdAndUpdate(userID, {
            $push: { transactionList: newTransaction._id },
        });

        return res.status(200).json({
            success: {
                message: 'Transaction added successfully.',
            },
        });
    } catch (error) {
        console.log(`${error.message}`.red);
        return res.status(500).json({
            error: {
                message: 'Internal server error.',
            },
        });
    }
};

/**
 * @type        DELETE
 * @route       /api/transaction/delete/id:id
 * @description Delete Transaction controller.
 * @access      Private
 */
exports.deleteTransaction = async (req, res) => {
    try {
        const userID = req.auth;
        const transactionID = req.query.id;

        const deletedTransaction = await Transaction.findByIdAndDelete(
            transactionID
        );
        if (!deletedTransaction) {
            return res.status(404).json({
                error: {
                    message: 'Item is not present.',
                },
            });
        }
        await User.findByIdAndUpdate(userID, {
            $pull: { transactionList: transactionID },
        });

        return res.status(200).json({
            success: {
                message: 'Transaction deleted successfully.',
            },
        });
    } catch (error) {
        console.log(`${error.message}`.red);
        return res.status(500).json({
            error: {
                message: 'Internal server error.',
            },
        });
    }
};
