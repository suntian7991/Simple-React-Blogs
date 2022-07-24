const crypto = require("crypto")

module.exports = (str) => {
  return crypto.createHash("md5")
    .update("SRB" + str) //Add an obfuscated string for better security 
    .digest("hex")//Decimal
}

