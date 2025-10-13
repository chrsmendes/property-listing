const passport = require('passport');

const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.send(
    req.session.user !== undefined
      ? `Welcome to the Listing Property API!\nYou are logged in as ${req.session.user.displayName}.`
      : 'Welcome to the Listing Property API!\nYou are not logged in. Please login or register.'
  );
});

router.get('/login', passport.authenticate('github'), (req, res) => {
  
});

router.get('/github/callback', passport.authenticate('github', 
  { failureRedirect: '/api-docs' , session: false}), 
  (req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) { return next(err); }
  });
  res.redirect('/');
});



module.exports = router;