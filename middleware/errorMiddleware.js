const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const errorHandler = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;

    console.error(err);

    if (err.name === 'CastError') {
      const message = 'Resource not found';
      return res.status(404).json({
        success: false,
        message
      });
    }

    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      const message = `${field} already exists`;
      return res.status(400).json({
        success: false,
        message
      });
    }

    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Server Error',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  } catch (handlerError) {
    console.error('Error in error handler:', handlerError);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

const notFound = (req, res, next) => {
  try {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  } catch (err) {
    console.error('Error in notFound middleware:', err);
    res.status(404).json({
      success: false,
      message: 'Not Found'
    });
  }
};

module.exports = {
  asyncHandler,
  errorHandler,
  notFound
};

