/**
 * @author Coderc
 * @description Authentication router.
 */

const express = require('express');

const { signup, signin } = require('../controllers/auth');
const { validateSignUp, validateSignIn } = require('../middlewares/checkReq');

const router = express.Router();

/**
 * @type        POST
 * @route       /api/auth/signup
 * @description SignUp Router
 * @access      Public
 */
router.post('/signup', validateSignUp, signup);

/**
 * @type        POST
 * @route       /api/auth/signin
 * @description SignIn Router
 * @access      Public
 */
router.post('/signin', validateSignIn, signin);

module.exports = router;
