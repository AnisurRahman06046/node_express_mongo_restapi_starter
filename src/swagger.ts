import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

// Compute __dirname using CommonJS


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Your API Title',
    version: '1.0.0',
    description: 'A description of your API',
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Local server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../app/routes/*.ts')], // Adjust this path as needed
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app: Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
