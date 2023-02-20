const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Render home page with existing blog posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User }],
        });
        const post = postData.map((post) => post.get({ plain: true}));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Render single blog and comments
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
        include: [
            { model: User },
            {
                model: Comment,
                include: [{ model: User }],
            },
        ],
        });

        const post = postData.get({ plain: true });

        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;