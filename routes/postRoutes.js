const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// Create Post
router.post('/create', async (req, res) => {
    const { title, content } = req.body;
    if (req.session.userId) {
        const newPost = new Post({
            title,
            content,
            author: req.session.userId
        });
        await newPost.save();
        res.redirect('/');
    } else {
        res.status(401).send('Unauthorized');
    }
});

// Delete Post
router.post('/delete/:id', async (req, res) => {
    if (req.session.userId) {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } else {
        res.status(401).send('Unauthorized');
    }
});

module.exports = router;