import express = require("express");
import { UserController } from "../../controllers/v1/users.controller";

export class RoutesV1 {
  private routes: express.Router;
  private userPath: string;
  constructor() {
    this.userPath = "/users";
    this.routes = express.Router();
  }

  getRoutes() {
    this.routes.get(
      "/",
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.json({
          message: "Api Project",
          version: "v1 route"
        });
      }
    );

    // User routes
    this.routes.get(`${this.userPath}`, UserController.getAll);
    this.routes.get(`${this.userPath}/:id`, UserController.getById);
    this.routes.post(`${this.userPath}`, UserController.create);
    this.routes.put(`${this.userPath}/:id`, UserController.edit);
    this.routes.delete(`${this.userPath}/:id`, UserController.delete);

    return this.routes;
  }
}
