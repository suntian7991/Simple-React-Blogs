const { User } = require('../model')
const jwt = require("../util/jwt");
const { jwtSecret } = require("../config/config.default");

// User Registration 
exports.register = async (req, res, next) => {
    try {
        let user = new User(req.body.user);
        await user.save();

        user = user.toJSON();
        delete user.password;

        res.status(201).json({
            user
        });    
    } catch (err) {
        next(err); 
    }
};

// User Authentication 
exports.login = async (req, res, next) => {
    try {
      const user = req.user.toJSON();
      const token = await jwt.sign(
        {userId: user._id},
        jwtSecret,
        { expiresIn: 60 * 60 * 2 }//lifetime for token:2 hour
        );
      //Removes the password attribute before sending a successful response
      delete user.password;
      res.status(200).json({
        ...user,
        token
      });
    
    } catch (err) {
      next(err);
    }
};
  
// Get Current User 
exports.getCurrentUser = async (req, res, next) => {
  try {

    res.status(200).json({
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};
  
