/**
 * @author Coderc
 * @description User Model.
 */

const crypto = require('crypto');
const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const { ObjectId } = mongoose.Schema;

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },

        userName: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },

        encryptedPassword: {
            type: String,
            trim: true,
            required: true,
        },

        salt: String,

        todoList: [
            {
                type: ObjectId,
                ref: 'ToDo',
            },
        ],

        noteList: [
            {
                type: ObjectId,
                ref: 'Note',
            },
        ],
    },
    { timestamp: true }
);

UserSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = uuid();
        this.encryptedPassword = this.securedPassword(password);
    })
    .get(function () {
        return this._password;
    });

UserSchema.methods = {
    /**
     * @description Authenticate user with the plain password
     * @param plainPassword
     * @returns { boolean }
     */
    authenticate: function (plainPassword) {
        return this.securedPassword(plainPassword) === this.encryptedPassword;
    },

    /**
     * @description Hash the plain password
     * @param plainPassword
     * @returns { string }
     */
    securedPassword: function (plainPassword) {
        if (plainPassword) {
            try {
                return crypto
                    .createHmac('sha256', this.salt)
                    .update(plainPassword)
                    .digest('hex');
            } catch (error) {
                return '';
            }
        } else {
            return '';
        }
    },
};

module.exports = User = mongoose.model('User', UserSchema);
