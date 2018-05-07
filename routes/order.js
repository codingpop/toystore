import express from 'express';
import { Joi, celebrate, errors } from 'celebrate';

import OrderController from '../controllers/OrderController';
import JoiSchemas from '../middleware/JoiSchemas';
import { Order } from '../models';
import Guard from '../middleware/Guard';
import excludeProperties from '../helpers/excludeProperties';

const order = express.Router();
const orderController = new OrderController({
  Order,
  excludeProperties,
});

order.post(
  '/',
  Guard.verifyToken,
  celebrate(JoiSchemas.order(Joi)),
  orderController.createOrder.bind(orderController),
);

order.get(
  '/',
  Guard.verifyToken,
  orderController.retrieveOrders.bind(orderController),
);

order.use(errors);

export default order;
