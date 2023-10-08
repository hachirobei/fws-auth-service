const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    expiration: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('Token', tokenSchema);