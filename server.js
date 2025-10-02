const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require("swagger-ui-express");
const bodyParser = require('body-parser');

const mongodb = require('./config/db/conection');

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000

app.get('/', (req, res, next) => {
  res.send('This is the home ')
})

mongodb.initDb((err, db) => {
  if (err) {
    console.error(err)
  } else {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  }
})