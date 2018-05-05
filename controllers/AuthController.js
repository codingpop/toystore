/**
 * AuthController class
 */
export default class AuthController {
  /**
   * @param {Object} dependencies - AuthController's dependencies
   */
  constructor(dependencies) {
    this.User = dependencies.User;
    this.bcrypt = dependencies.bcrypt;
    this.createToken = dependencies.createToken;
    this.excludeProperties = dependencies.excludeProperties;
  }

  /**
   * Registers a new user
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Passes execution to the next middleware
   *
   * @memberof AuthController
   *
   * @returns {void}
   */
  async signUp(req, res, next) {
    try {
      const { dataValues } = await this.User.create(req.body);
      const user = this.excludeProperties(dataValues, [
        'password',
        'createdAt',
        'updatedAt',
      ]);

      res.status(201).json({
        user,
        token: this.createToken(req, user),
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Logs a user in
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Passess execution to the next middleware
   *
   * @memberof AuthController
   *
   * @returns {void}
   */
  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;

      const existingUser = await this.User.findOne({ where: { email } });

      if (existingUser) {
        const { dataValues } = existingUser;

        const passwordMatches = await this.bcrypt.compare(
          password,
          dataValues.password,
        );

        if (passwordMatches) {
          const user = this.excludeProperties(dataValues, [
            'password',
            'createdAt',
            'updatedAt',
          ]);

          res.status(200).json({
            user,
            token: this.createToken(req, user),
          });
        } else {
          const err = new Error();
          err.name = 'AuthenticationError';
          err.message = 'incorrect sign in credentials';

          throw err;
        }
      } else {
        const err = new Error();
        err.name = 'NotFoundError';
        err.message = `${email} is not registered`;

        throw err;
      }
    } catch (err) {
      next(err);
    }
  }
}
