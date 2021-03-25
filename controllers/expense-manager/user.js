/**
 * @author Coderc
 * @description User controller.
 */

require('colors');

const User = require('../../models/expense-manager/user');

/**
 * @type        GET
 * @route       /api/user
 * @description Fetch User's Details controller.
 * @access      Private
 */
exports.userDetails = async (req, res) => {
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
                message: 'User details fetched successfully.',
                user,
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
 * @route       /api/user/update
 * @description Update User's Details controller.
 * @access      Private
 */
exports.updateDetails = async (req, res) => {
    try {
        const userID = req.auth;
        const options = {
            new: true,
        }; // Returns updated value.

        const updatedUser = await User.findByIdAndUpdate(
            userID,
            req.body,
            options
        )
            .populate(
                'transactionList',
                '_id title description category amount date'
            )
            .select({ encryptedPassword: 0, salt: 0 });

        return res.status(200).json({
            success: {
                message: 'User details updated successfully.',
                user: updatedUser,
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
 * @route       /api/user/delete
 * @description Delete User controller.
 * @access      Private
 */
exports.deleteUser = async (req, res) => {
    try {
        const userID = req.auth;

        await User.findByIdAndDelete(userID);

        return res.status(200).json({
            success: {
                message: 'User deleted successfully.',
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
