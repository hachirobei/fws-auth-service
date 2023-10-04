const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateTokenMiddleware = require('../middlewares/validateToken');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/users', authController.getUsers);

router.post('/validate-token', validateTokenMiddleware, (req, res) => {
    res.json({ valid: true, userId: req.userId });
});

module.exports = router;