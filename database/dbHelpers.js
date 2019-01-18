// const { connection } = require('./index.js');
const { sequelize } = require('./index.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const Cities = sequelize.define('cities', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  cityname: Sequelize.TEXT
}, {
    timestamps: false
  });
const Restaurants = sequelize.define('restaurants', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  restaurantname: Sequelize.TEXT
}, {
    timestamps: false
  });
const Cuisines = sequelize.define('cuisines', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  cuisinename: Sequelize.TEXT
}, {
    timestamps: false
  });

sequelize.sync();


// const searchForCities = (metro, callback) => {
//   connection.query(`SELECT * FROM cities WHERE metroId = (SELECT id FROM metros WHERE metro = '${metro}')`, function (err, result) {
//     if (err) {
//       callback(err);
//     }
//     else {
//       callback(null, result);
//     }
//   })
// }


const queryCategories = (query, callback) => {
    let result = {};
    Cities.findAll({
        where: {
            city: {
                [Op.like]: `%${query}%`
            }
        }
    })
        .then(data => {
            result['cities'] = data;
            Cuisines.findAll({
                where: {
                    cuisineName: {
                        [Op.like]: `%${query}%`
                    }
                }
            })
                .then(data2 => {
                    result['cuisines'] = data2;
                    Restaurants.findAll({
                        where: {
                            restaurantName: {
                                [Op.like]: `%${query}%`
                            }
                        }
                    })
                        .then(data => {
                            result['restaurants'] = data;
                            callback(null, result)
                        })
                })
        })
        .catch(err => {
            callback(err);
        })
}

const deleteRestaurantHelper = (id, callback) => {
  Restaurants.destroy({where: {id}})
    .then(() => {
      callback();
    })
    .catch((err) => {
      callback(err);
    })
}

const editRestaurantHelper = (id, restaurantname, callback) => {
  Restaurants.update({ restaurantname }, {where: {id}})
  .then(() => {
    callback();
  })
  .catch((err) => {
    callback(err);
  })
}

const createRestaurantHelper = (id, restaurantname, callback) => {
  Restaurants.create({ id, restaurantname })
    .then(() => {
      callback();
    })
    .catch((err) => {
      callback(err);
    })
}
module.exports = { queryCategories, Cities, Restaurants, Cuisines, deleteRestaurantHelper, editRestaurantHelper, createRestaurantHelper }