const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();

// Add a comment
router.post('/add', async (req, res) => {
    if (req.session.userId) {
        const newComment = new Comment({
            postId: req.body.postId,
            user: req.session.userId,
            content: req.body.content
        });
        await newComment.save();
        res.redirect(`/post/${req.body.postId}`);
    } else {
        res.status(401).send('Unauthorized');
    }
});

// Delete a comment
router.post('/delete/:id', async (req, res) => {
    if (req.session.userId) {
        await Comment.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } else {
        res.status(401).send('Unauthorized');
    }
});

module.exports = router;