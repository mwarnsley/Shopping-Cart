"use strict";
var mongoose = require('mongoose');

// Create the schema for the books
var booksSchema = mongoose.Schema({
  title: String,
  description: String,
  images: String,
  price: Number
});

// Create the model of the books passing in the schema
var Books = mongoose.model('Books', booksSchema);

// Export the books model
module.exports = Books;
