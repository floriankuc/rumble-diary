require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json(), cors());

//db config with env
const db = process.env.MONGODB_URI;

const startServer = () => {
  try {
    mongoose.connect(db, {
      useNewUrlParser: true,
    });
    app.listen(port, () => console.log('Server up on port: ' + port));
  } catch (error) {
    console.log('Server error: ', error.message);
  }
};

//use routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

//serve if in prod
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const port = process.env.PORT || 5000;

startServer();
