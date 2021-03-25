/**
 * @author Coderc
 * @description Authentication controller.
 */

const jwt = require('jsonwebtoken');
require('colors');

const User = require('../../models/expense-manager/user');

/**
 * @type        POST
 * @route       /api/auth/signup
 * @description User Signup controller.
 * @access      Public
 */
exports.signup = async (req, res) => {
    try {
        /**
         * @description Check if user exists with given username.
         * @param Username
         */
        const existingUser = await User.findOne({
            userName: req.body.userName,
        });
        if (existingUser) {
            return res.status(400).json({
                error: {
                    message: 'User already exists.',
                },
            });
        }

        /**
         * @description Create new user and save it.
         * @param Request Body
         */
        let user = new User(req.body);
        await user.save();

        user = user.toJSON();
        delete user.salt;
        delete user.encryptedPassword;
        /**
         * @description Generate token using jsonwebtoken package.
         *              Set token to cookie.
         *              Return the user details with token.
         * @param User ID
         * @param A string as salt
         */
        const token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.SECRET
        );
        const options = {
            maxAge: 999999999999999,
            secure: process.env.NODE_ENV === 'production',
            httpOnly: process.env.NODE_ENV === 'production',
        };
        res.cookie('expense_manager_user_token', 'Bearer ' + token, options);
        return res.status(200).json({
            success: {
                token,
                message: 'User created successfully.',
                user: user,
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
 * @route       /api/auth/signin
 * @description User Signin controller.
 * @access      Public
 */
exports.signin = async (req, res) => {
    try {
        const { userName, password } = req.body;
        let user = await User.findOne({ userName }).populate(
            'transactionList',
            '_id title description category amount date'
        );

        /**
         * @description Checks if user is present with provided username or
         *              password if is matched with matched with database.
         */
        if (!user || !user.authenticate(password)) {
            return res.status(401).json({
                error: {
                    message: 'Please check credentials.',
                },
            });
        }

        user = user.toJSON();
        delete user.salt;
        delete user.encryptedPassword;

        /**
         * @description Generate token using jsonwebtoken package.
         *              Set token to cookie.
         *              Return the user details with token.
         * @param User ID
         * @param A string as salt
         */
        const token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.SECRET
        );
        const options = {
            maxAge: 999999999999999,
            secure: process.env.NODE_ENV === 'production',
            httpOnly: process.env.NODE_ENV === 'production',
        };
        res.cookie('expense_manager_user_token', 'Bearer ' + token, options);
        return res.status(200).json({
            success: {
                token,
                message: 'User signed in successfully',
                user: user,
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
