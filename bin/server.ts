import path from "path";
import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";

// Criando as configurações para o ExpressJS
class App {
  // Instancia dele
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configuração para o nosso middler

  private middleware(): void {
    this.express.use(logger("dev"));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  //Configuração da nossa API e nossos EndPoint e o famoso Hello

  private routes(): void {
    let router = express.Router();

    router.get("/", (req, res, next) => {
      res.json({
        version: process.env.npm_package_version,
        message: process.env.npm_package_description
      });
    });
    this.express.use("/", router);
  }
}

export default new App().express;
