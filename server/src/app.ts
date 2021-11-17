import cookieParser from 'cookie-parser';
import express, { Application, Request as ExRequest, Response as ExResponse } from "express";
import mongoose from "mongoose";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "../build/routes";
import { errorHandler } from './util/errorHandler';

export class App {
  private readonly app: Application;

  constructor() {
    this.app = express();

    this.setupStaticFolder();
    this.initializeMiddlewares();
    this.initializeSwaggerDocs();
    RegisterRoutes(this.app);
    this.app.use(errorHandler);

  }

  public setupStaticFolder() {
    this.app.use(express.static("public"));
  }
  public listen() {
    return this.app.listen(process.env.PORT, () => {

      console.log(`App listening on port ${process.env.PORT}`);
    });
  }

  public async connectDb() {

    try {
      const uri = process.env.MONGO_URI || 'invalid';
      return mongoose.connect(uri, {});
    } catch (error) {
      console.log('Error while connecting to the database', error);
    }
    return Promise.reject("could not connect to mongo");
  }

  public getServer(): Application {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private initializeSwaggerDocs() {
    this.app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
      return res.send(
        swaggerUi.generateHTML(await import("../build/swagger.json"))
      );
    });
  }
}


