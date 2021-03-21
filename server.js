/**
 * @author Coderc
 * @description Entry file for server.
 */

/**
 * @description Package dependencies.
 */
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
require('colors');
require('dotenv').config();

/**
 *  @description Internal dependencies.
 */
const connectDB = require('./config/db');
const indexRoutes = require('./router/router');

/**
 *  @description Defining variables.
 */
const PORT = 5000;
const app = express();

/**
 * @description Configuring middleware.
 */
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

/**
 *  @description Establishing Server Connection.
 */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`.green);
});

/**
 *  @description Connecting to MongoDB.
 */
connectDB();

/**
 *  @description Defining Routes.
 */
app.use(indexRoutes);
