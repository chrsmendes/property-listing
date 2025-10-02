const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Booking must be linked to a user'],
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: [true, 'Booking must be linked to a property'],
  },
  checkIn: {
    type: Date,
    required: [true, 'Check-in date is required'],
  },
  checkOut: {
    type: Date,
    required: [true, 'Check-out date is required'],
    validate: {
      validator: function (value) {
        return value > this.checkIn;
      },
      message: 'Check-out date must be after check-in date',
    },
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    min: [1, 'Total price must be greater than 0'],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
