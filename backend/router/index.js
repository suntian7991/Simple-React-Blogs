const express = require("express")
const router = express.Router()


// User and admin related routing
router.use("/user", require("./user"))
//router.use(require("./admin"));

//Profile related routing
router.use("/profile", require("./profile"))

//Article related routing
router.use("/article", require("./article"))

//Channel related routing
router.use(require("./channel"))

// Upload 
router.use(require("./upload"))

module.exports = router