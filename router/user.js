/**
 * @author Coderc
 * @description User router.
 */

const express = require('express');

const {
    userDetails,
    updateDetails,
    deleteUser,
} = require('../controllers/user');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();

/**
 * @type        GET
 * @route       /api/user
 * @description Fetch User's Details controller
 * @access      Private
 */
router.get('/', authenticateToken(), userDetails);

/**
 * @type        PATCH
 * @route       /api/user/update
 * @description Fetch User's Details controller
 * @access      Private
 */
router.get('/update', authenticateToken(), updateDetails);

/**
 * @type        PATCH
 * @route       /api/user/delete
 * @description Fetch User's Details controller
 * @access      Private
 */
router.get('/delete', authenticateToken(), deleteUser);

module.exports = router;
