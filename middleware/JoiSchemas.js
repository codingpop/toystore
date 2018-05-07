/**
 * Request validation class
 */
class JoiSchemas {
  /**
   * Generates schema for signup input validation
   *
   * @param {Object} Joi
   *
   * @returns {Object} - user JOI schema
   */
  static signUp(Joi) {
    return {
      body: {
        firstName: Joi.string().min(2).max(50).required()
          .trim(),
        lastName: Joi.string().min(2).max(50).required()
          .trim(),
        email: Joi.string().regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
          .required(),
        phone: Joi.number().required(),
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)
          .required(),
      },
    };
  }

  /**
   * Generates schema for signin input validation
   *
   * @param {Object} Joi
   *
   * @returns {Object} - user JOI schema
   */
  static signIn(Joi) {
    return {
      body: {
        email: Joi.string().regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
          .required(),
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)
          .required(),
      },
    };
  }

  /**
   * Generates schema for product input validation
   *
   * @param {Object} Joi
   *
   * @returns {Object} product JOI schema
   */
  static addProduct(Joi) {
    return {
      body: {
        name: Joi.string().min(2).max(80).required(),
        description: Joi.string().min(50).max(200).required(),
        stock: Joi.number().required(),
      },
    };
  }

  /**
   * Generates schema for edit product input validation
   *
   * @param {Object} Joi
   *
   * @returns {Object} product JOI schema
   */
  static editProduct(Joi) {
    return {
      body: {
        name: Joi.string().min(2).max(80).required(),
        description: Joi.string().min(50).max(200).required(),
        stock: Joi.number().required(),
      },
      params: {
        id: Joi.string().guid({ version: 'uuidv4' }),
      },
    };
  }

  /**
   * Generates schema for get product req.param validation
   *
   * @param {Object} Joi
   *
   * @returns {Object} product JOI schema
   */
  static product(Joi) {
    return {
      params: {
        id: Joi.string().guid({ version: 'uuidv4' }),
      },
    };
  }

  /**
   * Generates schema for get product req.param validation
   *
   * @param {Object} Joi
   *
   * @returns {Object} order JOI schema
   */
  static order(Joi) {
    return {
      body: {
        productId: Joi.string().guid({ version: 'uuidv4' }).required(),
        quantity: Joi.number().min(1).required(),
      },
    };
  }
}

export default JoiSchemas;
