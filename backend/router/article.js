// 改成文章
const express = require("express")
const articleCtrl = require("../controller/article")
const articleValidator = require('../validator/article')
const auth = require("../middleware/auth")

const router = express.Router()

// List Articles
router.get("/", articleCtrl.listArticles)

// Get article
router.get("/:articleId", articleValidator.getSingleArticle, articleCtrl.getSingleArticle)

// Create article
router.post("/", articleValidator.createArticle, articleCtrl.createArticle)
// router.post("/", auth, articleValidator.createArticle, articleCtrl.createArticle)

// Update article
router.put("/:articleId", articleValidator.updateArticle, articleCtrl.updateArticle)
// router.put("/:articleId", auth, articleValidator.updateArticle, articleCtrl.updateArticle)

// Delete article
router.delete("/:articleId", articleValidator.deleteArticle, articleCtrl.deleteArticle)
// router.delete("/:articleId", auth, articleValidator.deleteArticle, articleCtrl.deleteArticle)

module.exports = router