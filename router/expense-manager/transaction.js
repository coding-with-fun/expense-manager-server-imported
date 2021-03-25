/**
 * @author Coderc
 * @description Transaction router.
 */

const express = require('express');

const {
    getTransactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
} = require('../../controllers/expense-manager/transaction');
const { authenticateToken } = require('../../middlewares/auth');
const { validateTransaction } = require('../../middlewares/checkReq');

const router = express.Router();

/**
 * @type        GET
 * @route       /api/transaction
 * @description Fetch User's Transactions Router.
 * @access      Private
 */
router.get('/', authenticateToken(), getTransactions);

/**
 * @type        POST
 * @route       /api/transaction/add
 * @description Add New Transaction Router.
 * @access      Private
 */
router.post('/add', authenticateToken(), validateTransaction, addTransaction);

/**
 * @type        PUT
 * @route       /api/transaction/update/id:id
 * @description Update User's Details controller.
 * @access      Private
 */
router.put(
    '/update',
    authenticateToken(),
    validateTransaction,
    updateTransaction
);

/**
 * @type        DELETE
 * @route       /api/transaction/delete/id:id
 * @description Delete Transaction Router.
 * @access      Private
 */
router.delete('/delete', authenticateToken(), deleteTransaction);

module.exports = router;
