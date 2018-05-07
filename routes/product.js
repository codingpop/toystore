import express from 'express';
import { Joi, celebrate, errors } from 'celebrate';

import JoiSchemas from '../middleware/JoiSchemas';
import ProductController from '../controllers/ProductController';
import Guard from '../middleware/Guard';
import { Product } from '../models';
import excludeProperties from '../helpers/excludeProperties';

const product = express.Router();

const productController = new ProductController({
  Product,
  excludeProperties,
});

product.post(
  '/',
  Guard.verifyToken,
  Guard.admin,
  celebrate(JoiSchemas.addProduct(Joi)),
  productController.add.bind(productController),
);

product.get(
  '/',
  Guard.verifyToken,
  productController.getAll.bind(productController),
);

product.patch(
  '/:id',
  Guard.verifyToken,
  Guard.admin,
  celebrate(JoiSchemas.editProduct(Joi)),
  productController.edit.bind(productController),
);

product.get(
  '/:id',
  Guard.verifyToken,
  celebrate(JoiSchemas.product(Joi)),
  productController.get.bind(productController),
);

product.delete(
  '/:id',
  Guard.verifyToken,
  Guard.admin,
  celebrate(JoiSchemas.product(Joi)),
  productController.delete.bind(productController),
);

product.use(errors);

export default product;
