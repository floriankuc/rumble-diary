require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
//COOKIE
app.use(express.json(), cors());
//app.use(bodyPorser.json())

//db config with env
const db = process.env.MONGODB_URI;

//db config with config
// const db = config.get('mongoURI');

//connect to mongodb
mongoose
  .connect(db)
  //falls error
  // .connect(db, {
  //   useNewUrlParser: true,
  //   useCreateIndex:true
  // })
  .then(() => console.log('mongo connected'))
  .catch((err) => console.log(err));

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

app.listen(port, () => console.log('started on ' + port));
