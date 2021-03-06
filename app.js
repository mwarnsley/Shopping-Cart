var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();
// PROXY
var httpProxy = require('http-proxy');

// PROXY to API
const apiProxy = httpProxy.createProxyServer({
  target: 'http://localhost:3001'
});
app.use('/api', (req, res) => {
  apiProxy.web(req, res);
})

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
