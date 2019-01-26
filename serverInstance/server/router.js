const express = require('express');
const router = express.Router();
const { getSearchResults, deleteRestaurant, editRestaurant, createRestaurant } = require('./controller.js');

// router.route('/nav/:metro')
//   .get(getCities)

router.route('/search/:searched')
  .get(getSearchResults)

router.route('/restaurant')
  .post(createRestaurant)

router.route('/restaurant')
  .put(editRestaurant)

router.route('/restaurant/:id')
  .delete(deleteRestaurant)

module.exports = router;