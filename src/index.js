const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('../routes/authRoutes');

const app = express();

mongoose.connect('mongodb://auth-db:27017/auth', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(authRoutes);

app.listen(3001, () => {
  console.log('Auth service started on http://localhost:3001');
});