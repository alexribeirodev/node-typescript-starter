import { UserModel, User } from "../../models/v1/users.model";
import { responseDefault } from "../../helpers/validReturn";
import express = require("express");

export class UserController {
  constructor() {
    console.log(this);
  }

  static getAll(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    console.log(this);
    let users = new User();
    users
      .getAll()
      .then(data => {
        res.json(responseDefault(data));
      })
      .catch(err => {
        next(new Error(err));
      });
  }

  static getById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    let users = new User();
    users
      .getById(req.params.id)
      .then(data => {
        res.json(responseDefault(data));
      })
      .catch(err => {
        next(new Error(err));
      });
  }

  static create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    let users = new User();
    users
      .create(req.body)
      .then(data => {
        res.json(responseDefault(data));
      })
      .catch(err => {
        next(new Error(err));
      });
  }

  static edit(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    let users = new User();
    users
      .edit(req.params.id, req.body)
      .then(data => {
        res.json(responseDefault(data));
      })
      .catch(err => {
        next(new Error(err));
      });
  }

  static delete(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    let users = new User();
    users
      .delete(req.params.id)
      .then(data => {
        res.json(responseDefault(data));
      })
      .catch(err => {
        next(new Error(err));
      });
  }
}
