const fs = require('fs');
const faker = require('faker');

let writeStream1 = fs.createWriteStream(__dirname + '/city.csv');
let writeStream2 = fs.createWriteStream(__dirname + '/restaurant.csv');
let writeStream3 = fs.createWriteStream(__dirname + '/cuisine.csv');

// writeStream.write(/** input */)

// writeStream.on('finish', () => {
//   console.log('completed write file');
// })

// writeStream.end();
let start = Date.now();

function writeBigData(writer1, writer2, writer3, encoding, callback) {
  start = Date.now();
  let i = 3333335;
  write();
  function write() {
    let ok1 = true;
    let ok2 = true;
    let ok3 = true;
    do {
      i--;
      let city = faker.address.city();
      let restaurant = faker.company.companyName();
      let cuisine = faker.company.companyName();
      if (i === 0) {
        writer1.write(city + '\n', encoding, callback);
        writer2.write(restaurant + '\n', encoding, callback);
        writer3.write(cuisine + '\n', encoding, callback);
      } else {
        ok1 = writer1.write(city + '\n', encoding);
        ok2 = writer2.write(restaurant + '\n', encoding);
        ok3 = writer3.write(cuisine + '\n', encoding);
      }
    } while (i > 0 && ok1 && ok2 && ok3);
    if (i > 0) {
      if (!ok1) {
        // console.log('drain ok1 at i = ', i);
        writer1.once('drain', write);
      } else if (!ok2) {
        // console.log('drain ok2 at i = ', i);
        writer2.once('drain', write);
      } else if (!ok3) {
        // console.log('drain ok3 at i = ', i);
        writer3.once('drain', write);
      }
    }
  }
}

writeBigData(writeStream1, writeStream2, writeStream3, 'utf-8', () => {
  writeStream1.end();
  writeStream2.end();
  writeStream3.end();
  console.log('time to complete: ', Date.now()-start);
})

// writeStream1.on('finish', () => {
//   console.log('finished 1');
// }).end();

// writeStream2.on('finish', () => {
//   console.log('finished 2');
// }).end();

// writeStream3.on('finish', () => {
//   console.log('finished 3');
// }).end();