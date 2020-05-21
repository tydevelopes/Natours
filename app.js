const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
// Middleware to add the data from the body to the request object
app.use(morgan('dev'));
app.use(express.json());

// create own middleware
app.use((req, res, next) => {
  console.log(`${req.method} request at ${new Date().toISOString()}`);
  next();
});

// Mount routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
