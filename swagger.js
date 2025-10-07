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

swaggerAutogen(outputFile, endpointFiles, doc);