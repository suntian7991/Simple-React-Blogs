
const { User } = require("../model")

// Get Profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    const profile = user.profile
    const email = user.email

    res.status(200).json({
      email,
      profile
    })
  } catch (err) {
    next(err)
  }
}

