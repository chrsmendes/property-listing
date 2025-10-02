const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

let _db;

const initDb = (callback) => {
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
};

const getDb = () => {
  if(!_db) {
    throw Error('Db not initialized');
  }
  return _db;
}


module.exports = {
  initDb,
  getDb
}