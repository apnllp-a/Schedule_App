const authJwt = require("./authJwt");
const verifySignUp = require("../middleware/verifySigUp");

module.exports = {
  authJwt,
  verifySignUp
};