const Router = require('express').Router();

/*************
 * API DOCS
 **************/
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

// API Docs Route
Router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = Router;
