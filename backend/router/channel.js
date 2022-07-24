
const express = require("express")
const channelCtrl = require("../controller/channel")

const router = express.Router()

// Get channel 
router.get("/channels", channelCtrl.getChannel)

module.exports = router
