const userRoute = require('./user.route');
const articleRoute = require('./article.route');
const express = require('express');
const router = express.Router();


router.use('/', (req, res, next) => {
    console.log('hello from index.js');
    next();
});

router.use('/users', userRoute);
router.use('/articles', articleRoute);

module.exports = router;
