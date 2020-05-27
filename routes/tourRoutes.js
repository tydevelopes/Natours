const router = require('express').Router();
const {
  getAllTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
  aliasTopTours,
} = require('../controllers/tourController');

// Parameter middleware
// router.param('id', checkID);

// To use a middleware on a route, pass it as the first argument of the route
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
