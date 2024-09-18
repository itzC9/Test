const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = new User({ username, password });
        await newUser.save();
        res.redirect('/login.html');  // Redirect to login page
    } catch (error) {
        res.status(400).send('Error registering user');
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user._id;
        res.redirect('/post.html');  // Redirect to create post page
    } else {
        res.status(400).send('Invalid credentials');
    }
});

module.exports = router;