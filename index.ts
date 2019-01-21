import http from "http";
import debug from "debug";

import App from "./bin/server";

debug("ts-express:server");

const port = normalizePort(process.env.PORT || 3000);
App.set("port", port);

const server = http.createServer(App);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

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
