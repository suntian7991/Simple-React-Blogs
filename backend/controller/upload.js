
const { Photo } = require("../model")

exports.uploadPhoto = async (req, res, next) => {
  try {
    const photo = new Photo()
    const { img } = req.files
    console.log("req.files", req.files)
    photo.path = img.path
    photo.name = img.name
    await photo.save()
    /* req.fields // for unfile
    req.files // for file */
    res.status(201).json({
      photo
    })
  } catch (err) {
    next(err)
  }

}