const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, "../.env.test"),
});

module.exports = {
  testTimeout: 50000,
  maxConcurrency: 1,
};
