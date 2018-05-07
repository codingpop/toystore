/**
 * ProductController class
 */
export default class ProductController {
  /**
   * @param {Object} dependencies - Product's dependencies
   */
  constructor(dependencies) {
    this.Product = dependencies.Product;
    this.excludeProperties = dependencies.excludeProperties;
  }

  /**
   * Add a new product
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Passes execution to the next middleware
   *
   * @memberof ProductController
   *
   * @returns {void}
   */
  async add(req, res, next) {
    try {
      const { dataValues } = await this.Product.create(req.body);
      const product = this.excludeProperties(dataValues, [
        'createdAt',
        'updatedAt',
      ]);

      res.status(201).json({
        product,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Edits a product
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Passes execution to the next middleware
   *
   * @memberof ProductController
   *
   * @returns {void}
   */
  async edit(req, res, next) {
    try {
      const { name, stock, description } = req.body;
      const { id } = req.params;

      const result = await this.Product.update({
        name,
        stock,
        description,
      }, {
        where: { id },
      });

      if (result[0] === 1) {
        res.status(200).json({
          product: {
            id,
            ...req.body,
          },
        });
      } else {
        const err = new Error();
        err.name = 'NotFoundError';
        err.message = 'product does not exist';

        throw err;
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * Gets a product
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Passes execution to the next middleware
   *
   * @memberof ProductController
   *
   * @returns {void}
   */
  async get(req, res, next) {
    try {
      const { id } = req.params;
      const { dataValues } = await this.Product.findById(id);
      const product = this.excludeProperties(dataValues, [
        'createdAt',
        'updatedAt',
      ]);

      res.status(200).json({
        product,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Gets all products
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Passes execution to the next middleware
   *
   * @memberof ProductController
   *
   * @returns {void}
   */
  async getAll(req, res, next) {
    try {
      const products = await this.Product.findAll();

      res.status(200).json({
        products,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Deletes a product
   *
   * @param {Object} req - Request object
   * @param {Object} res - Response object
   * @param {Function} next - Passes execution to the next middleware
   *
   * @memberof ProductController
   *
   * @returns {void}
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const result = await this.Product.destroy({
        where: {
          id,
        },
      });

      if (result === 1) {
        res.sendStatus(204);
      } else {
        const err = new Error();
        err.name = 'NotFoundError';
        err.message = 'product not found';

        throw err;
      }
    } catch (err) {
      next(err);
    }
  }
}
