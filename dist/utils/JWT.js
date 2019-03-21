"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config_1 = require("../config");
class JWT {
    constructor() { }
    hashPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt
                .hash(password, config_1.default.AUTH_SALT_ROUND)
                .then(hashedPassword => {
                resolve(hashedPassword);
            })
                .catch(reject);
        });
    }
    genToken(data) {
        return jwt.sign({ data }, config_1.default.AUTH_SECRET, {
            expiresIn: config_1.default.AUTH_EXPIRE_IN
        });
    }
    decodeToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config_1.default.AUTH_SECRET, (err, decoded) => {
                if (err)
                    reject(err);
                resolve(decoded);
            });
        });
    }
    comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    }
}
exports.default = JWT;
//# sourceMappingURL=JWT.js.map