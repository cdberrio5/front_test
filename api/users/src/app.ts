import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/authRoutes';
import connectDatabase from './config/dbConfig';
import errorHandler from './middlewares/errorHandler';
import logger from './config/logger';
import helmet from 'helmet';
import cors from 'cors';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.connectToDatabase();
    this.setupRoutes();
    this.app.use(helmet());
    this.setupSwagger();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use( (req: Request, res: Response, next: NextFunction) => {
      logger.info(`${req.method} ${req.url}`);
      next();
    });
    this.app.use(errorHandler);
  }

  private connectToDatabase(): void {
    connectDatabase();
  }

  private setupSwagger(): void {
    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'API de Autenticación',
          version: '1.0.0',
          description: 'API de prueba tecnica',
        },
      },
      apis: ['./src/routes*.ts'],
    };

    const swaggerSpec = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {explorer: true}));
  }

  private setupRoutes(): void {
    this.app.use('/api/auth', authRoutes);
  }
}

export default new App().app;