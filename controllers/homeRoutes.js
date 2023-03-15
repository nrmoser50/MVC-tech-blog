const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Render home page with existing blog posts
router.get('/', async (req, res) => {
    console.log("here")
    try {
        const postData = await Post.findAll({
            include: [{ model: User }],
        });
        const posts = postData.map((post) => post.get({ plain: true}));

        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    console.log("here")

        res.render('login', {
          
        });
    
});

router.get('/signup', async (req, res) => {
    console.log("here")

        res.render('signup')
    
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

        res.render('singlePost', {
            post,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;