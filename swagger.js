const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointFiles = ['./routers/productRouter.js'];

swaggerAutogen(outputFile, endpointFiles);