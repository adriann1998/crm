const Crypto = require("crypto");
require("dotenv").config();

module.exports = (string) => {
  return Crypto.createHmac("sha256", process.env.HASH_SECRET_KEY)
    .update(string)
    .digest("hex");
};
