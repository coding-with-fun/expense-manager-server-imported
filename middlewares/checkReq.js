/**
 * @author Coderc
 * @description Request validation.
 */

const { check, validationResult } = require('express-validator');

/**
 * @description Defining check conditions.
 */
const checks = {
    checkName: check('name')
        .not()
        .isEmpty()
        .trim()
        .withMessage('Name must be registered.'),
    checkUserName: check('userName')
        .isLength({ min: 5 })
        .withMessage('Username must be at least 5 characters long.'),
    checkPassword: check('password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters long.'),
    checkContent: check('content')
        .notEmpty()
        .withMessage('Content is required.'),
};

/**
 * @description Defining SignUp check.
 */
const signUpCheckReq = () => [
    checks.checkName,
    checks.checkUserName,
    checks.checkPassword,
];

/**
 * @description Defining SignIn check.
 */
const signInCheckReq = () => [checks.checkUserName, checks.checkPassword];

/**
 * @description Defining ToDo check.
 */
const todoCheckReq = () => [checks.checkContent];

/**
 * @description Checking for errors.
 * @param req
 * @param res
 * @param next
 * @returns Array of errors
 */
const returnErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg,
        });
    }
    next();
};

module.exports = userValidator = {
    validateSignUp: [signUpCheckReq(), returnErrors],
    validateSignIn: [signInCheckReq(), returnErrors],
    validateToDo: [todoCheckReq(), returnErrors],
};
