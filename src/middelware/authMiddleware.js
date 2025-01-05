// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');  // Import jsonwebtoken to verify JWT
require('dotenv').config();
const { errorHandler } = require('./errorHandler.js');



// Middleware to verify the token
const verifyToken = (req, res, next) => {
    // Extract token from the Authorization header (Bearer <token>)
    const token = req.cookies?.token || req.body.token || req.header("Authorization")?.replace("Bearer ","");

    // Check if the token exists
    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }


    // Verify the token with the secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        console.log({decoded});

        // If token is valid, attach decoded user data to the request object
        req.user = decoded;
        
        // Proceed to the next middleware or route handler
        next();
    });
};


module.exports = {
    verifyToken
}