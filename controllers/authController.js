const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Token = require('../models/token');

exports.registerUser = async (req, res) => {
try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send('User registered');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

exports.loginUser = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    
    const secretKey = process.env.JWT_SECRET_KEY; 
    
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

        // Save the token to the database
        const expiration = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour
        const newToken = new Token({ userId: user._id, token, expiration });

        try {
            await newToken.save();
            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Failed to save token to the database.', error: error.message });
        }
    } else {
        res.status(400).send('Invalid credentials');
    }
};

exports.logoutUser = async (req, res) => {
    try {
        // Find and remove the user's token based on some criteria
        const deletedToken = await Token.findOneAndRemove({ userId: req.user.id });
        if (!deletedToken) {
            return res.status(404).json({ message: 'Token not found.' });
        }
        res.json({ message: 'User logged out successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out user.', error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user.", error: error.message });
    }
};

