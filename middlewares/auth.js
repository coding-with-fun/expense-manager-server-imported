/**
 * @author Coderc
 * @description Bearer token validation.
 */

const jwt = require('express-jwt');

exports.authenticateToken = () => {
    return [
        /**
         * @description Check for Bearer token.
         */
        jwt({
            secret: process.env.SECRET,
            algorithms: ['HS256'],
            userProperty: 'auth',
            getToken: function fromHeaderOrQuerystring(req) {
                const token = req.header.authToken;
                if (token && token.split(' ')[0] === 'Bearer') {
                    return token.split(' ')[1];
                }
                return null;
            },
        }),
        (err, req, res, next) => {
            /**
             * @description Return error in case of invalid token.
             */
            return res.status(err.status).json({
                error: {
                    message: err.inner.message,
                },
            });
        },
    ];
};
