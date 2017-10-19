"use strict";

var path = require('path');
var express = require('express');
var proxy = require('http-proxy-middleware');

var options = {
	target: 'http://localhost:3660',
	changeOrigin: true,
	ws: true
};



var app = express();
app.use(express.static(path.join(__dirname, './dist')));
app.use('/api', proxy(options));
app.listen(80);