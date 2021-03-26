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

const allowedDomains = ['http://127.0.0.1:3000', 'http://localhost:3000'];
app.use(
    cors({
        origin: function (origin, callback) {
            // bypass the requests with no origin (like curl requests, mobile apps, etc )
            if (!origin) return callback(null, true);

            if (
                allowedDomains.indexOf(origin) === -1 ||
                !origin.includes('expense-manager-')
            ) {
                var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
    })
);
// app.use((req, res, next) => {
//     const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000'];
//     const origin = req.headers.origin;
//     if (
//         allowedOrigins.includes(origin) ||
//         origin.includes('expense-manager-')
//     ) {
//         console.log('CORS', origin);
//         res.setHeader('Access-Control-Allow-Origin', origin);
//     }
//     //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
//     res.header(
//         'Access-Control-Allow-Methods',
//         'GET, OPTIONS, POST, PUT, DELETE'
//     );
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Content-Type, Authorization, x-auth-token'
//     );
//     res.header('Access-Control-Allow-Credentials', true);
//     return next();
// });

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
