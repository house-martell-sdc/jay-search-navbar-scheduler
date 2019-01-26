// const { connection } = require('./index.js');
const { sequelize } = require('./index.js');
const Sequelize = require('sequelize');
// const Promise = require('bluebird');

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


// const queryCategories = (query, callback) => {
//   let result = {};
//   sequelize.query(`select cityname from cities where cityname LIKE '%${query}%'`, {type: sequelize.QueryTypes.SELECT})
//     .then(data => {
//       result['cities'] = data;
//       sequelize.query(`select cuisinename from cuisines where cuisinename LIKE '%${query}%'`, {type: sequelize.QueryTypes.SELECT})
//         .then(data2 => {
//           result['cuisines'] = data2;
//           sequelize.query(`select restaurantname from restaurants where restaurantname LIKE '%${query}%'`, {type: sequelize.QueryTypes.SELECT})
//             .then(data3 => {
//               result['restaurants'] = data3;
//                 callback(null, result)
//             })
//         })
//     })
//     .catch(err => {
//       callback(err);
//     })
// }

const queryCategories = (query, callback) => {
  let result = {};

  const getCities = () => {
    return sequelize.query(`select cityname from cities where cityname LIKE '%${query}%' and id > 900000 limit 10`, {type: sequelize.QueryTypes.SELECT})
  }
  
  const getCuisines = () => {
    return sequelize.query(`select cuisinename from cuisines where cuisinename LIKE '%${query}%' and id > 90000 limit 10`, {type: sequelize.QueryTypes.SELECT})
  }

  const getRestaurants = () => {
    return sequelize.query(`select restaurantname from restaurants where restaurantname LIKE '%${query}%' and id > 9000000 limit 10`, {type: sequelize.QueryTypes.SELECT})
  }

  // const join = Promise.join;
  
  // join(getCities(), getCuisines(), getRestaurants(),
  //   function(data1, data2, data3) {
  //     result = {
  //       cities: data1,
  //       cuisines: data2,
  //       restaurants: data3,
  //     }
  //   callback(null, result);
  // })

  Promise.all([getCities(), getCuisines(), getRestaurants()])
  .then((resultsarr)=> {
    result = {
      cities: resultsarr[0],
      cuisines: resultsarr[1],
      restaurants: resultsarr[2],
    }
    callback(null, result);
  })
  .catch((err)=>{
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