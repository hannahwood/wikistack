'use strict';

var express = require('express');
var app = express();
var swig = require('swig');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var swig = require('swig');
require('./filters')(swig);
var path = require('path');



// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn off swig's caching
swig.setDefaults({cache: false});

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests


// start the server
app.listen(3000, function(){
  console.log('listening on port 3000');
});

// typical way to use express static middleware
app.use(express.static(path.join(__dirname, '/public')));

// routes
app.use('/wiki', require('./routes/wiki'));


