const fs = require('fs');
const faker = require('faker');

let writeCity = fs.createWriteStream(__dirname + '/city2.csv');
let writeRestaurant = fs.createWriteStream(__dirname + '/restaurant2.csv');
let writeCuisine = fs.createWriteStream(__dirname + '/cuisine2.csv');
let start;

function writeCityData(writer, encoding, callback) {
  start = Date.now();
  let i = 1000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      let city = faker.address.city();
      if (i === 0) {
        writer.write(1000000 + ',' + city + '\n', encoding, callback);
      } else {
        ok = writer.write((1000000-i) + ',' + city + '\n', encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}

function writeRestaurantData(writer, encoding, callback) {
  start = Date.now();
  let i = 10000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      let restaurant = faker.random.word();
      if (i === 0) {
        writer.write(10000000 + ',' + restaurant + '\n', encoding, callback);
      } else {
        ok = writer.write((10000000-i) + ',' + restaurant + '\n', encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}

function writeCuisineData(writer, encoding, callback) {
  start = Date.now();
  let i = 100000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      let cuisine = faker.lorem.word();
      if (i === 0) {
        writer.write(100000 + ',' + cuisine + '\n', encoding, callback);
      } else {
        ok = writer.write((100000-i) + ',' + cuisine + '\n', encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}

writeCityData(writeCity, 'utf-8', () => {
  writeCity.end();
  console.log('time to complete city data: ', Date.now()-start);
})

writeRestaurantData(writeRestaurant, 'utf-8', () => {
  writeRestaurant.end();
  console.log('time to complete restaurant data: ', Date.now()-start);
})

writeCuisineData(writeCuisine, 'utf-8', () => {
  writeCuisine.end();
  console.log('time to complete cuisine data: ', Date.now()-start);
})
