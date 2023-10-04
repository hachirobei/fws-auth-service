const mongoose = require('mongoose');
const User = require('../models/user');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27018/auth'; 

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to mangodb-flood');
    ensureAdminExists();
});

mongoose.connection.on('error', (err) => {
    console.error('Failed to connect to mangodb-flood', err);
});

const ensureAdminExists = async () => {
    try {
        const adminUsername = "admin";
        let admin = await User.findOne({ username: adminUsername });

        if (!admin) {
            admin = new User({
                username: adminUsername,
                password: "adminPassword", // Make sure to use a secure password in a real scenario
                role: "admin"
            });
            await admin.save();
            console.log("Admin user created!");
        } else {
            console.log("Admin user already exists.");
        }
    } catch (error) {
        console.error("Error ensuring admin user:", error.message);
    }
};