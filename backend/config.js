const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  endpoint: process.env.DB_URL,
  PORT: 4000
};