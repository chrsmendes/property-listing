// routes/index.js
const User = require('../models/userModel');

const passport = require('passport');
const router = require('express').Router();

router.get('/', (req, res) => {
  if (req.session.user) {
    const { firstName, lastName } = req.session.user;
    res.send(`Welcome to the Listing Property API!\nYou are logged in as ${firstName} ${lastName}.`);
  } else {
    res.send('Welcome to the Listing Property API!\nYou are not logged in. Please login or register.');
  }
});


router.get('/login', passport.authenticate('github'));


router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
  (req, res) => {
    const token = req.user.token;
    const user = req.user;
    console.log(req.user);
     res.send(user);
  }
  
);


router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.redirect('/');
    });
  });
});

module.exports = router;
