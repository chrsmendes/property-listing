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
  async(req, res, profile, done) => {
    req.session.user = req.user; 
     try {
            
            let user = await User.findOne({ email: req.user.email });
    
            
            if (!user) {
              const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
    
              user = await User.create({
                firstName: profile.displayName?.split(' ')[0] || profile.username,
                lastName: profile.displayName?.split(' ')[1] || ' ',
                email,
                profileImage: profile.photos?.[0]?.value || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                oauthProvider: 'github',
                oauthId: profile.id,
              });
            }
    
            // Generar token JWT
            const token = jwt.sign(
              { id: user._id },
              process.env.JWT_SECRET,
              { expiresIn: '7d' }
            );
    
            
            user = user.toObject();
            user.token = token;

          
    
            done(null, user);
          } catch (err) {
            done(err, null);
          }
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
