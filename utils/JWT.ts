import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import config from "../config";

export default class JWT {
  constructor() {}

  hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt
        .hash(password, config.AUTH_SALT_ROUND)
        .then(hashedPassword => {
          resolve(hashedPassword);
        })
        .catch(reject);
    });
  }

  genToken(data: any): string {
    return jwt.sign({ data }, config.AUTH_SECRET, {
      expiresIn: config.AUTH_EXPIRE_IN
    });
  }

  decodeToken(token: string): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.AUTH_SECRET, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    });
  }

  comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
