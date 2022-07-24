const { validationResult, buildCheckFunction } = require("express-validator");
const { isValidObjectId } = require("mongoose");


const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

// Determine if the id is a valid ObjectID
validate.isValidObjectId = (location, fields) => {
return buildCheckFunction(location)(fields).custom(async (value) => {
  if (!isValidObjectId(value)) {
    return Promise.reject("ID is not a valid ObjectID");
  }
});
};
module.exports = validate;