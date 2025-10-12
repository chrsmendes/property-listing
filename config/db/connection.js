const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

let _db;

const initDb = (callback) => {
  try {
    if (_db) {
      console.log('Db is already initialized! 😁')
      return callback(null, _db);
    }
    mongoose.connect(process.env.MONGO_DB_URL)
      .then((client) => {
        _db = client;
        callback(null, _db)
      })
      .catch((err) => {
        callback(err);
      });
  } catch (err) {
    console.error('Error initializing database:', err);
    callback(err);
  }
};

const getDb = () => {
  try {
    if(!_db) {
      throw Error('Db not initialized');
    }
    return _db;
  } catch (err) {
    console.error('Error getting database:', err);
    throw err;
  }
}


module.exports = {
  initDb,
  getDb
}