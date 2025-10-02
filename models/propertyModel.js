const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Property title is required'],
    trim: true,
    minlength: [5, 'Title must have at least 5 characters'],
    maxlength: [100, 'Title must be less than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [20, 'Description must have at least 20 characters']
  },
  address: {
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    zipCode: { type: String, required: true, trim: true }
  },
  propertyType: {
    type: String,
    enum: ['apartment', 'house', 'studio', 'villa', 'cabin'],
    required: true
  },
  size: {
    type: Number, // en m²
    required: true,
    min: [10, 'Property size must be at least 10 m²']
  },
  rooms: {
    bedrooms: { type: Number, required: true, min: 1 },
    bathrooms: { type: Number, required: true, min: 1 },
    livingRooms: { type: Number, default: 1 },
    kitchens: { type: Number, default: 1 }
  },
  amenities: {
    wifi: { type: Boolean, default: false },
    tv: { type: Boolean, default: false },
    airConditioning: { type: Boolean, default: false },
    heating: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    pool: { type: Boolean, default: false },
    kitchen: { type: Boolean, default: true },
    washer: { type: Boolean, default: false },
    dryer: { type: Boolean, default: false }
  },
  pricePerNight: {
    type: Number,
    required: true,
    min: [10, 'Price per night must be at least $10']
  },
  maxGuests: {
    type: Number,
    required: true,
    min: [1, 'At least 1 guest is required']
  },
  images: [
    {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/128/9202/9202500.png'
    }
  ],
  rules: {
    smokingAllowed: { type: Boolean, default: false },
    petsAllowed: { type: Boolean, default: false },
    partiesAllowed: { type: Boolean, default: false },
    checkInTime: { type: String, default: '15:00' },
    checkOutTime: { type: String, default: '11:00' }
  },
  propertyManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
