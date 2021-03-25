/**
 * @author Coderc
 * @description Index router.
 */

const express = require('express');

const expressManagerRoutes = require('./expense-manager/router');

const app = express();
const BASE_URL = '/api';

app.use(BASE_URL + '/expense-manager', expressManagerRoutes);

module.exports = app;
