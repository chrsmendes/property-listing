const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info:{
        title: 'Users Api',
        description: 'Users Api'
    },
    host: 'localhost:3000',
    schemas: ['https']
};

const outputFile = './swagger-output.json';
const endpointFiles = ['./server.js']

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