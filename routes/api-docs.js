const express = require('express');
const router = express.Router();

/*************
 * API DOCS
 **************/
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

// API Docs Route
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
