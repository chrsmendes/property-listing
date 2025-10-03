const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require("swagger-ui-express");

const mongodb = require('./config/db/conection');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

app.get('/', (req, res, next) => {
  res.send('This is the home ')
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

mongodb.initDb((err, db) => {
  if (err) {
    console.error(err)
  } else {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  }
})
