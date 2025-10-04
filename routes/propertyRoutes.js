const express = require('express');
const model = require('../models/propertyModel');
const { validateObjectId } = require('../middleware/validationMiddleware');

const router = express.Router();
const propertyRoute = {}

/* ***************************
* GET controller - Get all properties
*****************************/
propertyRoute.getProperties = async (req, res) => {
  try {
    const properties = await model.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching properties: ' + error.message });
  }
}

/* ***************************
* POST controller - Create a new property
*****************************/
propertyRoute.createProperty = async (req, res) => {
  try {
    const property = new model(req.body);
    const savedProperty = await property.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    res.status(400).json({ error: 'Error creating property: ' + error.message });
  }
}

/* ***************************
* DELETE controller - Delete property by ID
*****************************/
propertyRoute.deleteProperty = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await model.findByIdAndDelete(id);
    if(result){
      res.status(201).json({ message: 'Property has been deleted' });
    } else {
      res.status(400).json({ message: 'Error deleting property' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting property: ' + error.message });
  }
}

/* ***************************
* PUT controller - Update property by ID
*****************************/
propertyRoute.putProperty = async (req, res) => {
  const { id, title, description, address, propertyType, size, rooms, amenities, pricePerNight, maxGuests, images, rules, propertyManager } = req.body;

  try {
    const result = await model.findByIdAndUpdate(
      id,
      {
        title, description, address, propertyType, size, rooms, amenities, pricePerNight, maxGuests, images, rules, propertyManager
      },
      { new: true }
    );
    if(result){
      res.status(201).json({ message: 'Property has been updated', property: result });
    } else {
      res.status(400).json({ message: 'Error updating the property' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating property: ' + error.message });
  }
}

/* ***************************
* Routes setup
*****************************/
router.get('/', propertyRoute.getProperties);
router.post('/', propertyRoute.createProperty);
router.delete('/:id', validateObjectId, propertyRoute.deleteProperty);
router.put('/:id', validateObjectId, propertyRoute.putProperty);

module.exports = router;
