require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DEV_DB,
    host: process.env.DB_HOST,
  },
  test: {
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.TEST_DB,
    host: process.env.DB_HOST,
  },
  production: {
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.PROD_DB,
    host: process.env.DB_HOST,
  },
};
