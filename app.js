const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();
// Middleware to add the data from the body to the request object
app.use(morgan('dev'));
app.use(express.json());

// create own middleware
app.use((req, res, next) => {
  console.log(`${req.method} request at ${new Date().toISOString()}`);
  next();
});

// create routes
// read json file and parse it
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Route handlers

//TOURS
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTourById = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; // Convert id from string to number
  const tour = tours.find(tour => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const newTour = { id, ...req.body }; // Can use Object.assign({id}, req.body)
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  console.log(req.body);

  const id = req.params.id * 1; // Convert id from string to number
  const tour = tours.find(tour => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const UpdatedTours = tours.map(tour => {
    if (tour.id === id) {
      console.log({ ...tour, ...req.body });

      return { ...tour, ...req.body };
    }
    return tour;
  });

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(UpdatedTours),
    err => {
      res.status(200).json({
        status: 'success',
        data: {
          tour: req.body,
        },
      });
    }
  );
};

const deleteTour = (req, res) => {
  console.log(req.body);

  const id = req.params.id * 1; // Convert id from string to number
  const tour = tours.find(tour => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const UpdatedTours = tours.filter(tour => tour.id !== id);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(UpdatedTours),
    err => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};

// USERS
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

// create a get route to the tours endpoint
// The json data will be sent using JSEND - A json formatting standard

// Express router
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

// Mount routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
