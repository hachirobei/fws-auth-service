const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('../routes/authRoutes');

const app = express();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/auth'; 

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => {
    console.log('Connected to MongoDB successfully!');
})
.catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
});

app.use(express.json());
app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`fws-auth-service running on port ${PORT}`);
});