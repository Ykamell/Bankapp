const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const { verifyToken } = require('../middleware/auth');

router.post('/login', userController.loginUser);

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.get('/users/applications/:application_id', userController.getUserByApplicationId);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;


