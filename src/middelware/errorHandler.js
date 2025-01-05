// Custom Error Class for Application-Specific Errors
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode; // HTTP status code for the error
    }
}

// Error-Handling Middleware
const errorHandler = (err, req, res, next) => {
    // Default to 500 (Internal Server Error) if status code is not set
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Optional: Log errors in development mode for debugging
    if (process.env.NODE_ENV !== 'production') {
        console.error('Error Stack:', err.stack);
    }

    // Send error response
    res.status(statusCode).json({
        success: false,
        error: {
            message, // Error message to show to the client
            statusCode, // HTTP status code
        },
    });
};

module.exports = { errorHandler };
