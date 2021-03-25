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
const PORT = process.env.PORT || 5000;
const app = express();

/**
 * @description Configuring middleware.
 */
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(cors());

app.use((req, res, next) => {
    const allowedOrigins = [
        'http://127.0.0.1:8020',
        'http://localhost:8020',
        'http://127.0.0.1:9000',
        'http://localhost:9000',
        'http://localhost:3000',
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    res.header(
        'Access-Control-Allow-Methods',
        'GET, OPTIONS, POST, PUT, DELETE'
    );
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

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
