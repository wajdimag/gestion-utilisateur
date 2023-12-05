const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/utilisateur');
var Utilisateur = require('../model/utilisateur');

//Add
async function add(req, res, next) {
    try {
      const { username, email, password } = req.body;
  
      // Check if the username or email already exist
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists. Please choose a different one.' });
      }
  
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds
  
      // If the username and email are unique, proceed with adding the user
      const utilisateur = new User({ username, email, password: hashedPassword });
      await utilisateur.save();
  
      res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
//Show
async function show(req, res, next) {
    try {
        const data = await Utilisateur.find();
        res.json(data);
    }
    catch (err) {
        console.log(err);
    }
}
//Update
async function update(req, res, next) {
    try {
      // Check if the request body contains the password field
      if (req.body.password) {
        // Hash the new password before updating the user
        req.body.password = await bcrypt.hash(req.body.password, 10); // 10 is the number of salt rounds
      }
  
      await User.findByIdAndUpdate(req.params.id, req.body);
      res.send("Utilisateur updated");
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

//Update
async function supprimer(req, res, next) {
    try {
        await Utilisateur.findByIdAndDelete(req.params.id, req.body);
        res.send("Utilisateur removed");
    }
    catch (err) {
        console.log(err);
    }

}

//Find par ID
async function trouver(req, res, next) {
    try {
        const data = await Utilisateur.findById(req.params.id);
        res.json(data);
    }
    catch (err) {
        console.log(err);
    }
}

async function login(req, res) {
    try {
      const { username, password } = req.body;
  
      // Your existing logic to find the user by username
      const user = await User.findOne({ username });
  
      // Check if the user exists and if the password is correct
      if (!user || !(await isValidPassword(password, user.password))) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // If login is successful, generate a JWT
      const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  // Helper function to validate the password using bcrypt
  async function isValidPassword(inputPassword, hashedPassword) {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }



module.exports = { add, show, update, supprimer, trouver, login };