const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

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
if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ id: user.id, username: user.username }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(400).send('Invalid credentials');
    }
};

exports.getUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
};