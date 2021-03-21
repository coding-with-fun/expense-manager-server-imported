/**
 * @author Coderc
 * @description Index router.
 */

const express = require('express');

const authRoutes = require('./auth');
const userRoutes = require('./user');
const todoRoutes = require('./todo');

const app = express();
const BASE_URL = '/api';

app.use(BASE_URL + '/auth', authRoutes);
app.use(BASE_URL + '/user', userRoutes);
app.use(BASE_URL + '/todo', todoRoutes);

module.exports = app;
