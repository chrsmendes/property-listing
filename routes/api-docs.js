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

const getProtocol = (req) => {
	const forwardedProto = req.headers['x-forwarded-proto'];
	if (forwardedProto) {
		return forwardedProto.split(',')[0];
	}
	return req.protocol;
};

router.get('/swagger.json', (req, res) => {
	const protocol = getProtocol(req).toLowerCase() === 'https' ? 'https' : 'http';
	const dynamicDoc = JSON.parse(JSON.stringify(swaggerDocument));

	dynamicDoc.host = req.get('host');
	dynamicDoc.schemes = [protocol];

	res.setHeader('Content-Type', 'application/json');
	res.send(dynamicDoc);
});

// API Docs Route
router.use('/', swaggerUi.serve, swaggerUi.setup(null, {
	swaggerOptions: {
		url: '/api-docs/swagger.json'
	}
}));

module.exports = router;
