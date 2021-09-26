require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const items = require('./routes/api/items');

const app = express();

app.use(express.json());
//app.use(bodyPorser.json())

//db config
const db = process.env.MONGODB_URI;

//connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log('mongo connected'))
  .catch((err) => console.log(err));

//use routes
app.use('/api/items', items);

//serve if in prod
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log('started on ' + port));
