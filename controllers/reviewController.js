const Review = require('../models/reviewModel');

/* ***************************
* Delete controller Review using id
*****************************/

const getAllReviews = async (req, res, next) => {
  try {
    const { page, limit } = req.pagination;
    const skip = (page - 1) * limit;

    const reviews = await Review.find()
      .select('-oauthId') // Exclude sensitive OAuth ID
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalReviews = await Review.countDocuments();
    const totalPages = Math.ceil(totalReviews / limit);

    res.status(200).json({
      success: true,
      data: reviews,
      pagination: {
        currentPage: page,
        totalPages,
        totalReviews,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (err) {
    next(err);
  }
};


const getReviewById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id)
      .select('-oauthId'); // Exclude sensitive OAuth ID

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'review not found'
      });
    }

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (err) {
    next(err);
  }
};

const createReview = async (req, res, next) => {
  try {
    const {user,
        property,
        rating,
        comment, } = req.body;

    const review = new Review({
      user,
      property,
      rating,
      comment,
    });

    const savedReview = await review.save();

    const reviewResponse = savedReview.toObject();
    delete reviewResponse.oauthId;

    res.status(201).json({
    success: true,
    message: 'Review created successfully',
    data: reviewResponse
  });
  } catch (err) {
    next(err);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
   
    const result = await Review.findByIdAndDelete(id);
    
    if(result){
        res.status(200).json({ 
            success: true,
            message: 'Review has been deleted' 
        });
    } else {
        res.status(404).json({ 
            success: false,
            message: 'Review not found' 
        });
    }
  } catch (err) {
    next(err);
  }
};


/* ***************************
* Put controller Review using id
*****************************/
    
const updateReview = async (req, res, next) => {
  try {
    const { id } = req.params; 

    const {user,
        property,
        rating,
        comment, } = req.body;

    const result = await Review.findByIdAndUpdate(
      id,
      {
        user,
        property,
        rating,
        comment,
      },
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({ 
        success: false,
        message: 'Review not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Review has been updated successfully',
      review: result
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {updateReview, deleteReview, getAllReviews, getReviewById, createReview  }