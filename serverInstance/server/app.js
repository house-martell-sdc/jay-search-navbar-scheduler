const express = require('express');
const app = express();
const router = require('./router.js')
const parser = require('body-parser');
const path = require('path');
const cors = require('cors');


app.use(parser.json());
app.use(cors());
app.use(parser.urlencoded({
    extended: true
}));
app.use('/api/', router);
app.use(express.static(path.join(__dirname, '../client/dist')));


module.exports = app;