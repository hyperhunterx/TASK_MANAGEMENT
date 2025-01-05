// src/middleware/roleMiddleware.js

// Middleware to check for the required role
const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next();  // If role matches, proceed to the route handler
        } else {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }
    };
};

module.exports = {
    checkRole
}

 