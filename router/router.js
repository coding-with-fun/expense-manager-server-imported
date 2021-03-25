/**
 * @author Coderc
 * @description Index router.
 */

const express = require('express');

const authRoutes = require('./expense-manager/auth');
const userRoutes = require('./expense-manager/user');
const transactionRoutes = require('./expense-manager/transaction');

const app = express();
const BASE_URL = '/api';

app.use(BASE_URL + '/auth', authRoutes);
app.use(BASE_URL + '/user', userRoutes);
app.use(BASE_URL + '/transaction', transactionRoutes);

module.exports = app;
