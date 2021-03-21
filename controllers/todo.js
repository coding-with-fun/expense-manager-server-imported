/**
 * @author Coderc
 * @description ToDo controller.
 */

require('colors');

const User = require('../models/user');
const ToDo = require('../models/todo');

/**
 * @type        POST
 * @route       /api/todo/add
 * @description Add New ToDo controller.
 * @access      Private
 */
exports.addToDo = async (req, res) => {
    try {
        const userID = req.auth;

        const newToDo = new ToDo({
            content: req.body.content,
        });
        await newToDo.save();

        await User.findByIdAndUpdate(userID, {
            $push: { todoList: newToDo._id },
        });

        return res.status(200).json({
            success: {
                message: 'ToDo added successfully.',
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
 * @route       /api/todo/delete/id:id
 * @description Delete ToDo controller.
 * @access      Private
 */
exports.deleteToDo = async (req, res) => {
    try {
        const userID = req.auth;
        const todoID = req.query.id;

        const deletedToDo = await ToDo.findByIdAndDelete(todoID);
        if (!deletedToDo) {
            return res.status(404).json({
                error: {
                    message: 'Item is not present.',
                },
            });
        }
        await User.findByIdAndUpdate(userID, {
            $pull: { todoList: todoID },
        });

        return res.status(200).json({
            success: {
                message: 'ToDo deleted successfully.',
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
