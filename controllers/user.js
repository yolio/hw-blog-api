const User = require('../models/user');
const Article = require('../models/article');

module.exports = { createUser,
    updateUser,
    retrieveUser,
    removeUser,
    listArticles
};

function createUser(req, res, next) {
    const user = new User(req.body);

    user.save().then(usr => {
    //res.status(200).send(`added user ${ usr.firstName } ${ usr.lastName }`);
        console.log(usr);
        res.status(200).json(usr);
    }).catch(err => console.error(err));

    //return res.json(user);
}

function updateUser(req, res, next) {
    User.findByIdAndUpdate(req.params.userId, {
        $set: req.body
    }, { new: true }).then(usr => {
        console.log(usr);
        res.status(200).json(usr);
    }).catch(err => console.error(err));
}

function retrieveUser(req, res, next) {
    User.findById(req.params.userId).populate('articles').lean().then(usr => {
        console.log(usr);
        res.status(200).json(usr);
    }).catch(err => console.error(err));
}

function removeUser(req, res, next) {
    Article.deleteMany({ 'owner': req.params.userId }).then(articles => {
        console.log(articles);
    }).catch(err => console.error(err));

    User.findByIdAndDelete(req.params.userId).then(usr => {
        console.log(usr);
	
        res.status(200).json(usr);
    }).catch(err => console.error(err));
}

function listArticles(req, res, next) {
    User.findById(req.params.userId, 'articles').populate('articles').lean().then(usr => {
        console.log(usr);
        res.status(200).send(usr);
    }).catch(err => console.error(err));
}