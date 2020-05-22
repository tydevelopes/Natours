const fs = require('fs');

// read json file and parse it
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// Route handlers
// The json data will be sent using JSEND - A json formatting standard

// Middleware to validate id. val holds the value of id
exports.checkID = (req, res, next, val) => {
  console.log('id: ', val);
  const id = val * 1; // Convert id from string to number
  const tour = tours.find(tour => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  // Attach tour to the res object
  res.tour = tour;
  next();
};

// Middleware to check request body if it contains the name and price property
exports.checkBody = (req, res, next) => {
  if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('price')) {
    return res.status(400).json({
      status: 'failure',
      message: 'Bad format, body should have name and price',
    });
  }

  next();
};

//TOURS
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTourById = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: res.tour,
    },
  });
};

exports.createTour = (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const newTour = { id, ...req.body }; // Can use Object.assign({id}, req.body)
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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

exports.updateTour = (req, res) => {
  const UpdatedTours = tours.map(tour => {
    if (tour.id === req.params.id) {
      console.log({ ...tour, ...req.body });

      return { ...tour, ...req.body };
    }
    return tour;
  });

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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

exports.deleteTour = (req, res) => {
  const UpdatedTours = tours.filter(tour => tour.id !== req.params.id);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(UpdatedTours),
    err => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};
