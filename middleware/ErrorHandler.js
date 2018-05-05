import { isCelebrate } from 'celebrate';

/**
 * Error handler class
 */
class ErrorHandler {
  /**
   * Handles errors app wide
   *
   * @param {Object} err - Error
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Passes executing to the next middleware
   *
   * @returns {Object} - error response
   */
  static handle(err, req, res, next) { // eslint-disable-line no-unused-vars
    if (isCelebrate(err)) {
      return ErrorHandler.badRequest(err, res);
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
      return ErrorHandler.conflict(err, res);
    }

    return ErrorHandler.serverError(err, res);
  }

  /**
   * Sends bad request error
   *
   * @param {Object} err - Error object
   * @param {Object} res - Response object
   *
   * @return {Object} - Error response
   */
  static badRequest(err, res) {
    const errors = err.details.map(({ context, message }) => {
      if (context.key === 'password') {
        return {
          path: context.key,
          message: 'password must contain, at least, 8 characters, and include at least, 1 lowercase letter, 1 uppercase letter, and 1 special character',
        };
      }

      if (context.key === 'email') {
        return {
          path: context.key,
          message: 'email is invalid',
        };
      }

      return {
        path: context.key,
        message: message.replace(/"/g, ''),
      };
    });

    return res.status(400).json({
      errors,
    });
  }

  /**
   * Sends conflict error
   *
   * @param {Object} err - Error object
   * @param {Object} res - Response object
   *
   * @return {Object} - Error response
   */
  static conflict(err, res) {
    const errors = err.errors.map(error => `${error.value} already exists`);

    return res.status(409).json({
      errors,
    });
  }

  /**
   * Sends server error
   *
   * @param {Object} err - Error object
   * @param {Object} res - Response object
   *
   * @returns {Object} - Error response
   */
  static serverError(err, res) {
    return res.status(500).json(err);
  }
}

export default ErrorHandler;
