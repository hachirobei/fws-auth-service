const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateTokenMiddleware = require('../middlewares/validateToken');
const isAdminMiddleware = require('../middlewares/isAdmin');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/users', authController.getUsers);

router.get('/users', validateTokenMiddleware, isAdminMiddleware, authController.getUsers);
router.delete('/users/:id', validateTokenMiddleware, isAdminMiddleware, authController.deleteUser);

router.post('/validate-token', validateTokenMiddleware, (req, res) => {
    res.json({ valid: true, userId: req.userId });
});

module.exports = router;