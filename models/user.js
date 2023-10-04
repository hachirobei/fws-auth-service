const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
      type: String, 
      enum: ['user', 'admin'],  // Define possible roles
      default: 'user'  // Set default role as 'user'
  },
});

// Hash password before saving
UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;