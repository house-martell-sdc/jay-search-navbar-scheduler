const { searchForCities, queryCategories, deleteRestaurantHelper, editRestaurantHelper, createRestaurantHelper } = require('../database/dbHelpers.js');

// const getCities = (req, res) => {
//     const metro = req.params.metro;
//     searchForCities(metro, (err, data) => {
//         if (err) {
//             res.status(404).send(err)
//         }
//         else { res.status(200).send(data) }
//     })
// }

const getSearchResults = (req, res) => {
    const searched = req.params.searched;
    queryCategories(searched, (err, data) => {
        if (err) {
            console.log('errrrrr', err)
            res.status(404).send(err)
        }
        else { res.status(200).send(data) }
    })
}

const deleteRestaurant = (res, req) => {
  deleteRestaurantHelper(res.params.id, (err, data) => {
    if (err) {
      console.error('error deleting a restaurant: ', err)
    } else {
      req.status(202).send('restaurant deleted!')
    }
  })
}

const editRestaurant = (res, req) => {
  editRestaurantHelper(res.body.id, res.body.restaurantname, (err, data) => {
    if (err) {
      console.error('error editing a restaurant: ', err)
    } else {
      req.status(202).send('restaurant edited!');
    }
  })
}

const createRestaurant = (res, req) => {
  createRestaurantHelper(res.body.id, res.body.restaurantname, (err, data) => {
    if (err) {
      console.error('error creating restaurant: ', err)
    } else {
      req.status(202).send('restaurant created!');
    }
  })
}

module.exports = { getSearchResults, deleteRestaurant, editRestaurant, createRestaurant };