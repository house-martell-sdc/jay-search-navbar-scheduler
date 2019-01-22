// const { connection } = require('./index.js');
const { sequelize } = require('./index.js');
const Sequelize = require('sequelize');
// const Op = Sequelize.Op;


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
    sequelize.query(`select cityname from cities where cityname LIKE '%${query}%'`, {type: sequelize.QueryTypes.SELECT})
      .then(data => {
        result['cities'] = data;
        sequelize.query(`select cuisinename from cuisines where cuisinename LIKE '%${query}%'`, {type: sequelize.QueryTypes.SELECT})
          .then(data2 => {
            result['cuisines'] = data2;
            sequelize.query(`select restaurantname from restaurants where restaurantname LIKE '%${query}%'`, {type: sequelize.QueryTypes.SELECT})
              .then(data3 => {
                result['restaurants'] = data3;
                  callback(null, result)
              })
          })
      })
      .catch(err => {
        callback(err);
      })
}

const getCities = () => {
  return new Promise((resolve, reject) => {
    sequelize.query(`select cityname from cities where cityname LIKE '%${query}%'`, {type: sequelize.QueryTypes.SELECT},  (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    })
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