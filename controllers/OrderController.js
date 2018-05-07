import { Product } from '../models';
/**
 * @class OrderController
 */
export default class OrderController {
  /**
   * @param {Object} dependencies - Product's dependencies
   */
  constructor(dependencies) {
    this.Order = dependencies.Order;
    this.excludeProperties = dependencies.excludeProperties;
  }

  /**
   * Creates an order
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Passes execution to the next middleware
   *
   * @memberof ProductController
   *
   * @returns {void}
   */
  async createOrder(req, res, next) {
    try {
      const { id } = req.user;
      const { productId, quantity } = req.body;

      const { dataValues } = await this.Order.create({
        userId: id,
        productId,
        quantity,
      });

      const order = this.excludeProperties(dataValues, [
        'updatedAt',
      ]);

      res.status(201).json({
        order,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Gets all orders for the current user
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Passes execution to the next middleware
   *
   * @memberof ProductController
   *
   * @returns {void}
   */
  async retrieveOrders(req, res, next) {
    try {
      const { id } = req.user;

      const { dataValues } = await this.Order.findAll({
        where: { userId: id },
        include: ['Order', 'Product'],
      });

      res.status(200).json({
        orders: dataValues,
      });
    } catch (err) {
      next(err);
    }
  }
}
