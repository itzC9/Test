const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Session Management
app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: true,
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/blogDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

// Use routes
app.use('/user', userRoutes);  // User routes for login and register
app.use('/post', postRoutes);  // Post routes for creating, deleting posts
app.use('/comment', commentRoutes);  // Comment routes for adding and deleting comments

// Start Server
app.listen(0323, () => {
    console.log("Server running on http://localhost:0323");
});