const router = require('express').Router();
const { User } = require('../../models');

// Sign up new user
router.post('.signup', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.loggedIn = true;
            res.status(200).json(newUser);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login user
router.post('.login', async (req, res) => {
    try {
        const user = await User.findOne({ where: {username: req.body.username }});

        if (!userData) {
            res.status(400).json({ message: 'Incorect username or password. Please try again.'});
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password. Please try again.'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;
            res.json({ user: userData, message: 'You have logged in successfully.' });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Log out user
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;