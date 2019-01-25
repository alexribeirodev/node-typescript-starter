import * as http from "http";
import * as debug from "debug";
import express = require("express");

import swaggerDoc from "./swaggerDoc";
import App from "./bin/server";

import { RoutesV1 } from "./src/routes/v1/index";

debug("ts-express:server");

const port = normalizePort(process.env.PORT || 3001);
App.set("port", port);

const server = http.createServer(App);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

swaggerDoc(App);

let v1 = new RoutesV1();
App.use("/v1", v1.getRoutes());

// Manipulando rotas não mapeadas com retorno 404
App.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).json({
      message: "Não foi possível encontrar essa rota."
    });
  }
);

// Manipulando retorno de erros
App.use(logErrors);
App.use(clientErrorHandler);
App.use(errorHandler);

function normalizePort(val: number | string): number | string | boolean {
  let port: number = typeof val === "string" ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") throw error;
  let bind = typeof port === "string" ? "Pipe " + port : "Porta " + port;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} precisa de privilégios elevados`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} já está em uso`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  let addr = server.address();
  let bind = typeof addr === "string" ? `pipe ${addr}` : `porta ${addr.port}`;
  debug(`Escutando em ${bind}`);
}

function logErrors(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.error(err);
  next(err);
}

function clientErrorHandler(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (req.xhr) {
    res.status(500).json({
      message: "Houve um erro na requisição",
      error: err
    });
  } else {
    next(err);
  }
}

function errorHandler(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  res.status(500).json({
    message: "Houve um erro na requisição",
    error: err.message ? err.message : err
  });
}
