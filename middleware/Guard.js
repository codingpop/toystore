import jwt from 'jsonwebtoken';

import { User } from '../models';
import appConfig from '../config/appConfig';

/**
 * API Gaurd class
 */
export default class Guard {
  /**
   * Verifies JWT
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Passes execution to the next middleware
   *
   * @memberof AuthController
   *
   * @returns {void}
   */
  static async verifyToken(req, res, next) {
    try {
      const { token } = req.headers;

      if (token) {
        const payload = await jwt.verify(token, appConfig.jwtSecret);

        const { dataValues } = await User.findById(payload.id);

        if (dataValues) {
          req.user = dataValues;

          next();
        } else {
          req.user = null;

          const err = new Error();
          err.name = 'AuthorizationError';
          err.message = 'invalid jwt token';

          throw err;
        }
      } else {
        req.user = null;

        const err = new Error();
        err.name = 'AuthorizationError';
        err.message = 'token not found';

        throw err;
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * Checks if user is an admin
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Passes execution to the next middleware
   *
   * @memberof AuthController
   *
   * @returns {void}
   */
  static admin(req, res, next) {
    if (req.user.role !== 'admin') {
      const err = new Error();
      err.name = 'AuthorizationError';
      err.message = 'only admin allowed';

      next(err);
    } else {
      next();
    }
  }
}
