const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('../routes/authRoutes');

const app = express();

const PORT = process.env.PORT || 3001;

require('../database/mangodb-auth');

app.use(express.json());
app.use(authRoutes);

app.listen(PORT, () => {
    console.log(`fws-auth-service running on port ${PORT}`);
});