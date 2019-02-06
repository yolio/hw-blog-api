const Article = require('../models/article');
const User = require('../models/user');

module.exports = { createArticle,
    updateArticle,
    removeArticle,
    findArticles,
};

function createArticle(req, res, next) {
    if (!User.findOne(req.body.owner)) {
        console.log('no such user');
        res.status(400).send('author not in the database');
    }

    const article = new Article(req.body);
    article.createdAt = Date.now();
    article.updatedAt = Date.now();

    article.save().then(article => {
        User.findByIdAndUpdate(article.owner, {
	    $inc: { numberOfArticles: 1 }
        }).then(author => {
	    author.articles.push(article);
	    author.save().catch(err => console.error(err));
            
            console.log(article);
            res.status(200).json(article);
        }).catch(err => console.error(err));
    });
}

function updateArticle(req, res, next) {
    Article.findByIdAndUpdate(req.params.articleId, {
        $set: req.body
    }, { new: true }).then(article => {
        article.update({
	    $set: { updatedAt: Date.now() }
        });
	
        console.log(article);
        res.status(200).json(article);
    }).catch(err => console.error(err));
}

function findArticles(req, res, next) {
    Article.find(req.body).populate('owner', 'firstName lastName').lean().then(articles => {
        console.log(articles);
        res.status(200).json(articles);
    }).catch(err => console.error(err));
}

function removeArticle(req, res, next) {
    Article.findByIdAndDelete(req.params.articleId).then(article => {
        User.findByIdAndUpdate(article.owner, {
	    $inc: { numberOfArticles: -1 }
        }).then(author => {
	    author.articles.remove(article);
	    author.save().catch(err => console.error(err));
        }).catch(err => console.error(err));
	
        console.log(article);
        res.status(200).json(article);
    }).catch(err => console.error(err));
}
