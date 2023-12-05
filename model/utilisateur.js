
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const Utilisateur = new Schema({
  username: String,
  email: String,
  password: String
});

// Hash the password before saving to the database
Utilisateur.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10); // 10 is the number of salt rounds
  }
  next();
});

module.exports = mongoose.model("utilisateur", Utilisateur);
