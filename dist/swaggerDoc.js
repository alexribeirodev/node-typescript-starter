"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
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
exports.default = (app) => {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
};
//# sourceMappingURL=swaggerDoc.js.map