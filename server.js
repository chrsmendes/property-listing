const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const swaggerUi = require("swagger-ui-express");
const User = require('./models/userModel');

const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const jwt = require('jsonwebtoken');



const mongodb = require('./config/db/connection');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000

// Middleware
app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
  }))
  // this is the basic express session initializer
  .use(passport.initialize())
  // init passport on every request
  .use(passport.session())
  // allow passport to use 'express-session' as middleware
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-key, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
  })
  .use(cors({ methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'] }))
  .use(cors({ origin: '*'}));





passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
 async (accessToken, refreshToken, profile, done) => {
      try {
        
        let user = await User.findOne({ oauthId: profile.id, oauthProvider: 'github' });

        
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
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'favicon.ico'));
});

/************* 
* Routes
**************/
// Base Router

app.use('/', require('./routes/index'));

// user Routes
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

// property Routes
const propertyRoute = require('./routes/propertyRoutes');
app.use('/properties', propertyRoute);

const reviewRoute = require('./routes/reviewRoutes');
app.use('/reviews', reviewRoute);

const bookingRoute = require('./routes/bookingRoutes');
app.use('/booking', bookingRoute);

// api-docs Routes 
const apiDocsRoute = require('./routes/api-docs.js');
app.use('/api-docs', apiDocsRoute);


// Error handling middleware
app.use(notFound);
app.use(errorHandler);


mongodb.initDb((err, db) => {
  if (err) {
    console.error('Failed to initialize database:', err)
    process.exit(1); // Exit with error code
  } else {
    try {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
      })
    } catch (err) {
      console.error('Failed to start server:', err);
      process.exit(1);
    }
  }
})
