/**
 * @author Coderc
 * @description Request validation.
 */

const { check, validationResult } = require('express-validator');

/**
 * @description Defining check conditions.
 */
const checks = {
    // For Sign In and Sign Up
    checkName: check('name')
        .not()
        .trim()
        .isEmpty()
        .withMessage('Name must be registered.'),
    checkUserName: check('userName')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Username must be at least 5 characters long.'),
    checkPassword: check('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters long.'),

    // For Transactions
    checkTitle: check('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required.'),
    checkDescription: check('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required.'),
    checkAmount: check('amount')
        .trim()
        .notEmpty()
        .withMessage('Amount is required.')
        .isDecimal()
        .withMessage('Please enter a valid Amount.'),
    checkDate: check('date').trim().notEmpty().withMessage('Date is required.'),
    checkCategory: check('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required.'),
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
 * @description Defining Transactions check.
 */
const transactionsCheckReq = () => [
    checks.checkTitle,
    checks.checkDescription,
    checks.checkAmount,
    checks.checkDate,
    checks.checkCategory,
];

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
    validateTransaction: [transactionsCheckReq(), returnErrors],
};
