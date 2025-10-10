const express = require('express');
const Booking = require('../models/bookingModel');

const router = express.Router();

const getAllBookings = async (req, res, next) => {
  try {
    const { page, limit } = req.pagination;
    const skip = (page - 1) * limit;

    const bookings = await Booking.find()
      .select('-oauthId') // Exclude sensitive OAuth ID
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalBookings = await Booking.countDocuments();
    const totalPages = Math.ceil(totalBookings / limit);

    res.status(200).json({
      success: true,
      data: bookings,
      pagination: {
        currentPage: page,
        totalPages,
        totalBookings,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (err) {
    next(err);
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id)
      .select('-oauthId'); // Exclude sensitive OAuth ID

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (err) {
    next(err);
  }
};

// {
//   "firstName": "Christopher",
//   "lastName": "Mendes",
//   "email": "christopher@mendes.com",
//   "oauthProvider": "github",
//   "oauthId": "github123456789",
//   "profileImage": "https://avatars.githubusercontent.com/u/77082167",
//   "role": "user"
// }
const createBooking = async (req, res, next) => {
  try {
    const { user, property, checkIn, checkOut, totalPrice, status, } = req.body;


    if (!user || !property || !checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        message: 'User, Property, check-in and check-out are required'
      });
    }

    const booking = new Booking({
        user, 
        property, 
        checkIn,
        checkOut,
        totalPrice, 
        status,
    });

    const savedBooking = await booking.save();

    // Remove sensitive OAuth ID from response
    const bookingResponse = savedBooking.toObject();
    delete bookingResponse.oauthId;

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: bookingResponse
    });
  } catch (err) {
    next(err);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const { user, property, checkIn, checkOut, totalPrice, status, } = req.body;
    const { id } = req.params;
   
    // Find the user by their ID
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
   
    // Only update the provided fields
    if (user) booking.user = user;
    if (property) booking.property = property;
    if (checkIn) booking.checkIn = checkIn
    if (checkOut) booking.checkOut = checkOut;
    if (totalPrice) booking.totalPrice = totalPrice;
    if (status) booking.status = status;
   
    const updatedBooking = await booking.save();
   
    const bookingResponse = updatedBooking.toObject();
    delete bookingResponse.oauthId;
   
    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: bookingResponse
    });
  } catch (err) {
    next(err);
  }
};
 
const deleteBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
   
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
   
    await Booking.findByIdAndDelete(id);
   
    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (err) {
    next(err);
  }
}; 
 


module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking

};