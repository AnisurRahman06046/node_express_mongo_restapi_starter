import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../package.json';
import { Application, Express, Request, Response } from 'express';
import path from 'path'
const opitons: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node-Express-Mongo-RestApi Docs',
      version,
    },
    components: {
      securitySchema: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    path.resolve(__dirname, './src/app/modules/Auth/Auth.routes.ts'),
    '../src/app/modules/User/User.schema.ts',
  ],
};

const swaggerSpec = swaggerJSDoc(opitons);

function swaggerDocs(app: Application, port: any) {
  // swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // docs in json format
  app.get('docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`Api documentation: http://localhost:${port}/docs/`);
}

export default swaggerDocs;
