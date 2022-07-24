
const express = require("express")
const profileCtrl = require("../controller/profile")

const router = express.Router()

// Get channel 
router.get("/:userId", profileCtrl.getProfile)

module.exports = router
