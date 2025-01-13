const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Superheros API',
      version: '1.0.0',
      description: 'API documentation for the Superheros application',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./swagger/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = specs;