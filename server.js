const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const itemsRoutes = require('./routes/api/items');
const usersRoutes = require('./routes/api/users');
const authRoutes = require('./routes/api/auth');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json(), cors());

app.use('/api/items', itemsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

const db = process.env.MONGODB_URI;

const startServer = () => {
  try {
    mongoose.connect(db, {
      useNewUrlParser: true,
    });
    app.listen(port, () => console.log(`Server up on port: ${port}`));
  } catch (error) {
    console.log(`Server error: ${error.message}`);
  }
};

//Serve if in prod
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

startServer();
