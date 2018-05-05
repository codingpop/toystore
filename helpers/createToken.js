import jwt from 'jsonwebtoken';

import appConfig from '../config/appConfig';

/**
 * Generates JWT for authentication and sets user in the request object
 *
 * @param {Object} req - Request object
 * @param {Object} payload - JWT Payload
 *
 * @returns {string} - JSON web token
 */
export default (req, payload) => {
  req.user = payload;

  return jwt.sign(
    payload,
    appConfig.jwtSecret,
    { expiresIn: appConfig.jwtExpiry },
  );
};
