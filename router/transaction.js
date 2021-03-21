/**
 * @author Coderc
 * @description Transaction router.
 */

const express = require('express');

const {
    addTransaction,
    deleteTransaction,
} = require('../controllers/transaction');
const { authenticateToken } = require('../middlewares/auth');
const { validateTransaction } = require('../middlewares/checkReq');

const router = express.Router();

/**
 * @type        POST
 * @route       /api/todo/add
 * @description Add New Transaction controller.
 * @access      Private
 */
router.post('/add', authenticateToken(), validateTransaction, addTransaction);
router.delete('/delete', authenticateToken(), deleteTransaction);

module.exports = router;
