const express = require("express")
const userCtrl = require("../controller/user")
const userValidator = require("../validator/user")
const auth = require("../middleware/auth")

const router = express.Router()

// User Authentication 
router.post("/login", userValidator.login, userCtrl.login)

//User  Registration 
router.post("/register", userValidator.register, userCtrl.register)

// Get Current User
router.get("/", auth, userCtrl.getCurrentUser)

// TODO:Update User
// router.get("/", auth, userCtrl.updatetUser)

module.exports = router



