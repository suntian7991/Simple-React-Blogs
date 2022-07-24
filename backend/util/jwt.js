const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// parse
exports.sign = promisify(jwt.sign);

// verify
exports.verify = promisify(jwt.verify);

// Direct parsing without validation
exports.decode = promisify(jwt.decode);

