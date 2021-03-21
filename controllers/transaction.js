/**
 * @author Coderc
 * @description Transaction controller.
 */

require('colors');

const User = require('../models/user');
const Transaction = require('../models/transaction');

/**
 * @type        GET
 * @route       /api/transaction
 * @description Fetch User's Transactions controller.
 * @access      Private
 */
exports.getTransactions = async (req, res) => {
    try {
        const userID = req.auth;

        const user = await User.findOne({
            _id: userID,
        })
            .populate(
                'transactionList',
                '_id title description category amount date'
            )
            .select({ encryptedPassword: 0, salt: 0 });

        /**
         * @description Return error if no user is present by given ID.
         */
        if (!user) {
            return res.status(404).json({
                error: {
                    message: 'User not found.',
                },
            });
        }

        return res.status(200).json({
            success: {
                message: 'User transactions fetched successfully.',
                transactionList: user.transactionList,
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
 * @type        POST
 * @route       /api/transaction/add
 * @description Add New Transaction controller.
 * @access      Private
 */
exports.addTransaction = async (req, res) => {
    try {
        const userID = req.auth;
        const options = {
            new: true,
        }; // Returns updated value.

        const newTransaction = new Transaction(req.body);
        await newTransaction.save();

        const user = await User.findByIdAndUpdate(
            userID,
            {
                $push: { transactionList: newTransaction._id },
            },
            options
        )
            .populate(
                'transactionList',
                '_id title description category amount date'
            )
            .select({ encryptedPassword: 0, salt: 0 });

        /**
         * @description Return error if no user is present by given ID.
         */
        if (!user) {
            return res.status(404).json({
                error: {
                    message: 'User not found.',
                },
            });
        }

        return res.status(200).json({
            success: {
                message: 'Transaction added successfully.',
                transactionList: user.transactionList,
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
 * @type        PUT
 * @route       /api/transaction/update/id:id
 * @description Update User's Details controller.
 * @access      Private
 */
exports.updateTransaction = async (req, res) => {
    try {
        const userID = req.auth;
        const transactionID = req.query.id;
        const options = {
            new: true,
        }; // Returns updated value.

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            transactionID,
            req.body,
            options
        );

        if (!updatedTransaction) {
            return res.status(404).json({
                error: {
                    message: 'Item is not present.',
                },
            });
        }

        const user = await User.findOne({
            _id: userID,
        })
            .populate(
                'transactionList',
                '_id title description category amount date'
            )
            .select({ encryptedPassword: 0, salt: 0 });

        /**
         * @description Return error if no user is present by given ID.
         */
        if (!user) {
            return res.status(404).json({
                error: {
                    message: 'User not found.',
                },
            });
        }

        return res.status(200).json({
            success: {
                message: 'Transaction updated successfully.',
                transactionList: user.transactionList,
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

        const user = await User.findByIdAndUpdate(userID, {
            $pull: { transactionList: transactionID },
        })
            .populate(
                'transactionList',
                '_id title description category amount date'
            )
            .select({ encryptedPassword: 0, salt: 0 });

        /**
         * @description Return error if no user is present by given ID.
         */
        if (!user) {
            return res.status(404).json({
                error: {
                    message: 'User not found.',
                },
            });
        }

        return res.status(200).json({
            success: {
                message: 'Transaction deleted successfully.',
                transactionList: user.transactionList,
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
