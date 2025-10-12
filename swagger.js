const dotenv = require('dotenv');
const swaggerAutogen = require('swagger-autogen')();

dotenv.config();

const hostEnv = process.env.HOST || 'localhost';
const portEnv = process.env.PORT;

const normalizedHost = hostEnv.replace(/^https?:\/\//, '');
const hostHasPort = /:\\d+$/.test(normalizedHost);
const isLocalhost = ['localhost', '127.0.0.1', '0.0.0.0'].includes(normalizedHost);

let swaggerHost = normalizedHost;

if (!hostHasPort) {
  if (isLocalhost) {
    const port = portEnv || '3000';
    swaggerHost = `${normalizedHost}:${port}`;
  }
} else {
  swaggerHost = normalizedHost;
}
const swaggerScheme = process.env.SWAGGER_SCHEME || 'http';

const doc = {
  info:{
    title: 'Users Api',
    description: 'Users Api'
  },
  host: swaggerHost,
  schemes: [swaggerScheme]
};

const outputFile = './swagger-output.json';
const endpointFiles = ['./server.js'];

// Generate swagger documentation with error handling
(async () => {
  try {
    await swaggerAutogen(outputFile, endpointFiles, doc);
    console.log('Swagger documentation generated successfully');
  } catch (err) {
    console.error('Error generating swagger documentation:', err);
    process.exit(1);
  }
})();