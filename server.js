const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const contactRoute = require('./routes/contactRoute');
const errorHandler = require('./middleware/errorMiddleware');
const path = require('path');

dotenv.config();
//Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to db');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true
  })
);

// Routes Middleware
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/contactus', contactRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

// app.use(express.static(path.join(__dirname, '/frontend/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
// });

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error Middleware
app.use(errorHandler);

// start server
const PORT = process.env.PORT || 9000;
app.listen(9000, () => {
  console.log(`Server is running on ${PORT}`);
});
