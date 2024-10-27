const express = require('express');
const bodyParser = require('body-parser');
const { connectDB}=require('./config/db')
const routes = require('./routes');

const app = express();

connectDB();

app.use(bodyParser.json());

app.use('/api', routes);

module.exports = app;