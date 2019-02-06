const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.use('/', (req, res, next) => {
    console.log('hello from user.route.js');
    next();
});

router.post('/', userController.createUser);

router.put('/:userId', userController.updateUser);

router.get('/:userId', userController.retrieveUser);

router.delete('/:userId', userController.removeUser);

router.get('/:userId/articles', userController.listArticles);

module.exports = router;
