
const { Article } = require("../model")

// TODO:filter author
// List Articles
exports.listArticles = async (req, res, next) => {
  try {
    const { page, per_page = 10, status,
      channel_id, channel_name,
      begin_pubdate, end_pubdate,
      author } = req.query
    const filter = {}
    if (channel_id) {
      filter["channel.id"] = channel_id
    }
    if (channel_name) {
      filter["channel.name"] = channel_name
    }
    if (status) {
      filter.status = status
    }

    if (begin_pubdate && end_pubdate) {
      beginDate = new Date(begin_pubdate)
      endDate = new Date(end_pubdate)
      const createdAt = { $gte: beginDate, $lt: endDate }
      filter.createdAt = createdAt
    }

    /* if (author) {
          const user = await User.findOne({ username: author });
          filter.author = user ? user._id : null;
        } */


    const articles = await Article.find(filter)
      .skip((page - 1) * per_page)
      .limit(+per_page)
    const filteredArticles = await Article.find(filter)
    console.log(typeof articles)
    const articlesCount = filteredArticles.length

    res.status(200).json({
      articles,
      articlesCount,
    })
  } catch (err) {
    next(err)
  }
}


//Get Single Article
exports.getSingleArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.articleId)
    if (!article) {
      return res.status(404).end()
    }
    res.status(200).json({
      article,
    })
  } catch (err) {
    next(err)
  }
}

//Create Article
exports.createArticle = async (req, res, next) => {
  try {
    const article = new Article(req.body.article)
    /* article.author = req.user._id;
    article.populate("author");
 */
    await article.save()
    res.status(201).json({
      article,
    })
  } catch (err) {
    next(err)
  }
}


//Update Article
exports.updateArticle = async (req, res, next) => {
  try {
    const article = req.article
    const bodyArticle = req.body.article
    article.title = bodyArticle.title || article.title
    article.description = bodyArticle.description || article.description
    article.channel = bodyArticle.channel || article.channel
    article.status = bodyArticle.status || article.status
    article.cover = bodyArticle.cover || article.cover
    await article.save()
    res.status(200).json({
      article,
    })
  } catch (err) {
    next(err)
  }
}

//Delete Article
exports.deleteArticle = async (req, res, next) => {
  try {
    const article = req.article
    await article.remove()
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}



