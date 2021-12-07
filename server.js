// SERVER

// Requirements
const express = require('express');
const helmet = require("helmet");
const morgan = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./routes');

// initialize express
const app = express();

app.use(helmet());

// middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//app.use(express.json());
//app.use(cors);
app.use(morgan('dev'));

// Using routes
app.use('/', routes);

// LIstening on Port
const PORT = 8080;
app.listen(PORT, () => console.log("Listening on port:", PORT));

module.exports = app;