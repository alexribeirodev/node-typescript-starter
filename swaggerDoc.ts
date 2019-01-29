import * as swaggerUi from "swagger-ui-express";
import swaggerJsdoc = require("swagger-jsdoc");
import express = require("express");

const packagejson = require("./package.json");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: packagejson.name,
      version: packagejson.version,
      description: packagejson.description
    },
    basePath: "/"
  },
  apis: ["./doc_definitions.yaml"]
};

const specs = swaggerJsdoc(options);

export default (app: express.Application) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
};
