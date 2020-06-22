const express = require('express');
const router = express.Router();
const userController = require('../controller/users');

/* Adding Router with HTTP methods */

router.post('/register', userController.addUser);
router.get('/all', userController.getAllUsers);
router.get('/:id', userController.getOneUser);
router.put('/:id', userController.updateOneUser);
router.delete('/:id', userController.deleteOneUser);
router.post('/login', userController.login);

module.exports = router;