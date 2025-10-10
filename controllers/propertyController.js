const express = require('express');
const model = require('../models/propertyModel')
const router = express.Router();
const { validateObjectId } = require('../middleware/validationMiddleware')
const Property = require('../models/propertyModel');
const { prototype } = require('form-data');

/* ***************************
* Delete controller Property using id
*****************************/

const getAllProperties = async (req, res, next) => {
  try {
    const { page, limit } = req.pagination;
    const skip = (page - 1) * limit;

    const properties = await Property.find()
      .select('-oauthId') // Exclude sensitive OAuth ID
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalProperties = await Property.countDocuments();
    const totalPages = Math.ceil(totalProperties / limit);

    res.status(200).json({
      success: true,
      data: properties,
      pagination: {
        currentPage: page,
        totalPages,
        totalProperties,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (err) {
    next(err);
  }
};


const getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id)
      .select('-oauthId'); // Exclude sensitive OAuth ID

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'property not found'
      });
    }

    res.status(200).json({
      success: true,
      data: property
    });
  } catch (err) {
    next(err);
  }
};

const createProperty = async (req, res, next) => {
  try {
    const {title,
        description,
        address,
        propertyType,
        size,
        rooms,
        amenities,
        pricePerNight,
        maxGuests,
        rules,
        propertyManager, } = req.body;

      const property = new Property({
        title,
        description,
        address,
        propertyType,
        size,
        rooms,
        amenities,
        pricePerNight,
        maxGuests,
        rules,
        propertyManager,
      });

      const savedProperty = await property.save();

      const propertyResponse = savedProperty.toObject();
      delete propertyResponse.oauthId;

    res.status(201).json({
    success: true,
    message: 'Property created successfully',
    data: propertyResponse
  });
  } catch (err) {
    next(err);
  }
};

const deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const result = await Property.findByIdAndDelete(id);
    
    if(result){
        res.status(200).json({ 
            success: true,
            message: 'Property has been deleted' 
        });
    } else {
        res.status(404).json({ 
            success: false,
            message: 'Property not found' 
        });
    }
  } catch (err) {
    next(err);
  }
};


/* ***************************
* Put controller Property using id
*****************************/
    
const putProperty = async (req, res, next) => {
  try {
    const { id } = req.params; // usually from route like /properties/:id
    const {
      title,
      description,
      address,
      propertyType,
      size,
      rooms,
      amenities,
      pricePerNight,
      maxGuests,
      images,
      rules,
      propertyManager
    } = req.body;

    const result = await model.findByIdAndUpdate(
      id,
      {
        title,
        description,
        address,
        propertyType,
        size,
        rooms,
        amenities,
        pricePerNight,
        maxGuests,
        images,
        rules,
        propertyManager
      },
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({ 
        success: false,
        message: 'Property not found' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Property has been updated successfully',
      property: result
    });
  } catch (err) {
    next(err);
  }
};




    module.exports = {putProperty, deleteProperty, getAllProperties, getPropertyById, createProperty  }