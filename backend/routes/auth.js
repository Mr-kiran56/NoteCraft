const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fecthuser');

const JWT_SECRET =  "psycho get you me";

// User creation route
router.post(
  '/createuser',
  [
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('bio', 'Enter a valid name').isLength({ min: 5 }),
   

    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must contain at least 5 characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(409).json({ error: 'This email is already registered.' });
      }

      const salt = await bcrypt.genSalt(10);
      const secrepass = await bcrypt.hash(req.body.password, salt);

      const newUser = await User.create({
        name: req.body.name,
        bio:req.body.bio,
        email: req.body.email,
        password: secrepass,
      });

      const data = { user: { id: newUser.id } };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.status(201).json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
  }
);

// Login route
router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', "Password can't be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Incorrect credentials.' });
      }

      const passwordCorrect = await bcrypt.compare(password, user.password);
      if (!passwordCorrect) {
        return res.status(400).json({ error: 'Incorrect password.' });
      }

      const data = { user: { id: user.id } };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Something went wrong.');
    }
  }
);  

// Get user route
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Unknown error occurred');
  }
});

module.exports = router;
