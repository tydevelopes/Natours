const {
  getAllTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
} = require('../controllers/tourController');

const router = require('express').Router();

// Parameter middleware
router.param('id', checkID);

// To use a middleware on a route, pass it as the first argument of the route
router.route('/').get(getAllTours).post(checkBody, createTour);

router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
