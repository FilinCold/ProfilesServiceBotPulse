const dotenv = require("dotenv");

dotenv.config();

const ENV = {
  MONGO_URI: process.env.MONGO_URI ?? "",
};

module.exports = { ENV };
