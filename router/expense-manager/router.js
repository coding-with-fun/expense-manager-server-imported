/**
 * @author Coderc
 * @description Index router.
 */

const express = require('express');

const authRoutes = require('./auth');
const userRoutes = require('./user');
const transactionRoutes = require('./transaction');

const app = express();

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/transaction', transactionRoutes);

module.exports = app;
