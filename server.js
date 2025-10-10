const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require("swagger-ui-express");

const mongodb = require('./config/db/connection');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/************* 
* Routes
**************/
// Base Router
app.get('/', (req, res, next) => {
  try {
    res.send('This is the home ')
  } catch (err) {
    next(err);
  }
});

// user Routes
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

// property Routes
const propertyRoute = require('./routes/propertyRoutes');
app.use('/properties', propertyRoute);

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
