"use strict";

var express = require('express');
var app = express();
var path = require('path');
var port = 3000;

// Middleware to define folder for static files
app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Application listening on port: ${port}`);
});
