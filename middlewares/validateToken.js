const Token = require('../models/token'); // Import your Token model

module.exports = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token not provided.' });
    }

    try {
        // Check if the token exists in the database
        const tokenDocument = await Token.findOne({ token });

        if (!tokenDocument) {
            return res.status(401).json({ message: 'Token not found.' });
        }

        // Check if the token has expired
        if (tokenDocument.expiration < new Date()) {
            return res.status(401).json({ message: 'Token has expired.' });
        }

        // If the token is valid, set user information in req.user
        req.userId = tokenDocument.userId;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Failed to authenticate token.', error: error.message });
    }
};