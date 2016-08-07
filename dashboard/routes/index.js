
/*
 * GET home page.
 */

var express = require('express');
var router = express.Router();
var app = express();

exports.index = function(req, res) {
	res.render('index', { title: 'Express' });
};

exports.transit = function(req, res) {
	var stops = [52866, 52856, 53120, 53210, 53211, 59316];
	res.render('transit', {title: 'Transit', stops: stops});
};

