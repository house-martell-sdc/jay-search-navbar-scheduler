const Sequelize = require('sequelize');

// const mysql = require('mysql');
// const mysqlConfig = require('./config.js');
// const connection = mysql.createConnection(mysqlConfig);

const sequelize = new Sequelize({
  database: 'sdcdb',
  username: 'roo',
  password: null,
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 8,
    min: 0,
    idle: 10000
  },
  operatorsAliases: false
});

sequelize.authenticate().then(() => {
  console.log("Successfully connected to database bruh");
}).catch((err) => {
  console.log(err);
});

module.exports = { sequelize };
// connection.end();