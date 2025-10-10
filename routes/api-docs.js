const express = require('express');
const router = express.Router();

/*************
 * API DOCS
 **************/
const swaggerUi = require('swagger-ui-express');

let swaggerDocument;
try {
  swaggerDocument = require('../swagger-output.json');
} catch (err) {
  console.error('Error loading swagger documentation:', err);
  swaggerDocument = { swagger: '2.0', info: { title: 'API', version: '1.0.0' }, paths: {} };
}

// API Docs Route
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
