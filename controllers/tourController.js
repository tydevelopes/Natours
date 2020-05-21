const fs = require('fs');

// read json file and parse it
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// Route handlers
// The json data will be sent using JSEND - A json formatting standard

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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
