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

const validateReviewInput = (req, res, next) => {
  const { user, property, rating, comment } = req.body;
  
  if (!user || !property || !rating || !comment) {
    return res.status(400).json({
      success: false,
      message: 'User, property, rating, and comment are required'
    });
  }
  
  if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(property)) {
    return res.status(400).json({
      success: false, 
      message: 'Invalid user or property ID format'
    });
  }
  
  if (typeof rating !== 'number' || rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      message: 'Rating must be a number between 1 and 5'
    });
  }
  
  next();
};

const validateBookingDates = (req, res, next) => {
  const { checkIn, checkOut } = req.body;
  
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const today = new Date();
  
  if (checkInDate >= checkOutDate) {
    return res.status(400).json({
      success: false,
      message: 'Check-out date must be after check-in date'
    });
  }
  
  if (checkInDate < today) {
    return res.status(400).json({
      success: false, 
      message: 'Check-in date cannot be in the past'
    });
  }
  
  next();
};

module.exports = {
  validateObjectId,
  validatePagination,
  validateReviewInput,
  validateBookingDates
};
