import express from 'express';
import { Joi, celebrate, errors } from 'celebrate';
import jwt from 'jsonwebtoken';

import JoiSchemas from '../middleware/JoiSchemas';
import ProductController from '../controllers/ProductController';
import Guard from '../middleware/Guard';
import { Product, User } from '../models';
import excludeProperties from '../helpers/excludeProperties';
import appConfig from '../config/appConfig';

const product = express.Router();

const productController = new ProductController({
  Product,
  excludeProperties,
});

const guard = new Guard({
  User,
  jwt,
  jwtSecret: appConfig.jwtSecret,
});

product.post(
  '/',
  guard.verifyToken.bind(guard),
  Guard.admin,
  celebrate(JoiSchemas.addProduct(Joi)),
  productController.add.bind(productController),
);

product.get(
  '/',
  guard.verifyToken.bind(guard),
  productController.getAll.bind(productController),
);

product.patch(
  '/:id',
  guard.verifyToken.bind(guard),
  Guard.admin,
  celebrate(JoiSchemas.editProduct(Joi)),
  productController.edit.bind(productController),
);

product.get(
  '/:id',
  guard.verifyToken.bind(guard),
  celebrate(JoiSchemas.product(Joi)),
  productController.get.bind(productController),
);

product.delete(
  '/:id',
  guard.verifyToken.bind(guard),
  Guard.admin,
  celebrate(JoiSchemas.product(Joi)),
  productController.delete.bind(productController),
);

product.use(errors);

export default product;
