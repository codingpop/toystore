/**
 * API Gaurd class
 */
export default class Guard {
  /**
   * @param {Object} dependencies - Guard's dependencies
   */
  constructor(dependencies) {
    this.User = dependencies.User;
    this.jwt = dependencies.jwt;
    this.jwtSecret = dependencies.jwtSecret;
  }
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
  async verifyToken(req, res, next) {
    try {
      const { token } = req.headers;

      if (token) {
        const payload = await this.jwt.verify(token, this.jwtSecret);

        const { dataValues } = await this.User.findById(payload.id);

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
    req.user.role = 'admin'
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
