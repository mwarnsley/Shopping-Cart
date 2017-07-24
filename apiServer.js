var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var port = 3001;
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// APIs
var mongoose = require('mongoose');
// Connect mongoose to the mongodb database
mongoose.connect('mongodb://localhost:27018/bookshop');

var db = mongoose.connection;
// Log prefix to send to MongoDB if there is an error
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

// --->>> SETUP SESSIONS <<<---
app.use(session({
  secret: 'mySecretString',
  saveUnitialized: false,
  resave: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2},
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}));
// Save to session
app.post('/cart', (req, res) => {
  var cart = req.body;
  req.session.cart = cart;
  req.session.save((err) => {
    if (err) {
      throw err;
    }
    res.json(req.session.cart);
  });
});
// Get session cart api
app.get('/cart', (req, res) => {
  if (typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart);
  }
});
// --->>> END SESSIONS <<<---

var Books = require('./models/books.js');

//-->> POST BOOKS <<--
app.post('/books', (req, res) => {
  var book = req.body;

  // Mongoose create will save one or more documents to the database
  Books.create(book, (err, books) => {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

//-->> GET BOOKS <<--
app.get('/books', (req, res) => {
  // Mongoose find will find all of the books in the database
  Books.find((err, books) => {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

//-->> DELETE BOOKS <<--
app.delete('/books/:_id', (req, res) => {
  var query = {_id: req.params._id};

  // Mongoose remove will remove the book that was selected
  Books.remove(query, (err, books) => {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

//-->> UPDATE BOOKS <<-- (NOT USED IN SHOPPING CART BUT SETUP IF NEEDED)
app.put('./books/:_id', (req, res) => {
  var book = req.body;
  var query = req.params._id;

  // If field doesn't exist we will set a new field
  var update = {
    '$set': {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };

  // When true returs the updated document
  var options = {new: true};

  Books.findOneAndUpdate(query, update, options, (err, books) => {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

// END APIs

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
})

module.exports = app;
