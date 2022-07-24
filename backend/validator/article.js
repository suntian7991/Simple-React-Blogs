const { body } = require("express-validator")
const validate = require("../middleware/validate")
const { Article } = require('../model')

exports.createArticle = validate([
  body("article.title").notEmpty().withMessage("Article title can't be empty"),
  body("article.description").notEmpty().withMessage("Article description can't be empty"),
])

exports.getSingleArticle = validate([
  validate.isValidObjectId(["params"], "articleId"),
])

exports.updateArticle = [

  validate([validate.isValidObjectId(["params"], "articleId"),]),

  // Verify that the article exists
  async (req, res, next) => {
    const articleId = req.params.articleId
    const article = await Article.findById(articleId)
    req.article = article
    if (!article) {
      return res.status(404).end()
    }
    next()
  },
]

exports.deleteArticle = exports.updateArticle