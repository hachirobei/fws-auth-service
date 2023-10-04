module.exports = (req, res, next) => {
    // Assuming that after validating the token, the user object is attached to the request object
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied. Not an admin.' });
    }
};