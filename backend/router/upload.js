const express = require("express")
const uploadCtrl = require("../controller/upload")

const formidable = require('express-formidable')
const formidableMiddleware = formidable()
const router = express.Router()

// Get channel 
router.post("/upload", formidableMiddleware, uploadCtrl.uploadPhoto)

module.exports = router