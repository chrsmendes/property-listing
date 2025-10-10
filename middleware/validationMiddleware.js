const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }
    
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Error validating ID',
      error: err.message
    });
  }
};

const validatePagination = (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (page < 1 || limit < 1 || limit > 100) {
      return res.status(400).json({
        success: false,
        message: 'Invalid pagination. Page must be >= 1, limit between 1-100'
      });
    }

    req.pagination = { page, limit };
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Error validating pagination',
      error: err.message
    });
  }
};

module.exports = {
  validateObjectId,
  validatePagination
};
