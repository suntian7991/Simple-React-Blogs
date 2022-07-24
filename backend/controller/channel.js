
const { Article } = require("../model")

// Get Channel 
exports.getChannel = async (req, res, next) => {
  try {
    // find all channels in Article
    const channels = await Article.distinct("channel")
    const channelsCount = channels.length
    // console.log(channels, channelsCount)
    res.status(200).json({
      channels,
      channelsCount,
    })
  } catch (err) {
    next(err)
  }
}

