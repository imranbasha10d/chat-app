import Express, { Application } from 'express';
import { json, urlencoded } from "body-parser";
import Routes from "./src/Routes";
import cors from "cors";
import mongoose from 'mongoose';
import { Log } from "./src/Logger";
import swaggerUI from "swagger-ui-express";
const swaggerDocument = require("./swagger.json");
require("dotenv").config();

class App {
  public application;
  private routes = new Routes()
  constructor() {
    this.application = Express();
    this.appConfig();
    this.startListen();
    this.routes.initialRoutes(this.application);

    this.mongoSetup();
  }

  private appConfig() {
    this.application.use(json());
    this.application.use(urlencoded({ extended: false }));
    this.application.use(cors({ credentials: true, origin: true, }));
    //swagger UI setup
    this.application.use(
      '/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument)
    );
  }

  private startListen() {
    this.application.listen(process.env.PORT, () => {
      return Log.info(`Express is listening at http://localhost:${process.env.PORT}`);
    })
  }

  private async mongoSetup() {
    try {
      Log.info('Enter into db connect');
      await mongoose.connect(process.env.DATABASE_URL);
      Log.info(`database connected`);
    } catch (error) {
      Log.error(`error in database connected`, error);
    }
  }
}

export default new App();