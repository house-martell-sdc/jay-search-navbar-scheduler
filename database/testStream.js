const fs = require('fs');
// const faker = require('faker');

let writeStream = fs.createWriteStream(__dirname + '/one.csv');
// let writeStream2 = fs.createWriteStream(__dirname + '/restaurant.csv');
// let writeStream3 = fs.createWriteStream(__dirname + '/cuisine.csv');

// writeStream.write(/** input */)

// writeStream.on('finish', () => {
//   console.log('completed write file');
// })

// writeStream.end();
let j = 0
function writeOneMillionTimes(writer, encoding, callback) {
  let i = 1000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      j++;
      if (i === 0) {
        // last time!
        writer.write(j.toString() + '\n', encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(j.toString() + '\n', encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
}

writeOneMillionTimes(writeStream, 'utf-8', () => {writeStream.end()})

// writeStream.on('finish', () => {
//   console.log('finished 1');
// }).end();

// writeStream2.on('finish', () => {
//   console.log('finished 2');
// }).end();

// writeStream3.on('finish', () => {
//   console.log('finished 3');
// }).end();