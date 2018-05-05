import express from 'express';
import bcrypt from 'bcryptjs';
import { Joi, celebrate, errors } from 'celebrate';

import { User } from '../models';
import excludeProperties from '../helpers/excludeProperties';
import AuthController from '../controllers/AuthController';
import createToken from '../helpers/createToken';
import JoiSchemas from '../middleware/JoiSchemas';

const auth = express.Router();
const authController = new AuthController({
  User,
  createToken,
  bcrypt,
  excludeProperties,
});

auth.post(
  '/signup',
  celebrate(JoiSchemas.signUp(Joi)),
  authController.signUp.bind(authController),
);

auth.post(
  '/signin',
  celebrate(JoiSchemas.signIn(Joi)),
  authController.signIn.bind(authController),
);

auth.use(errors);

export default auth;
