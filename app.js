var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fetch = require('node-fetch');
const API_KEY = process.env.MOVIEDB_API_KEY;

//var cors = require("cors");

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var itemsRouter = require('./routes/items');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/items', itemsRouter);
//app.use('/users', usersRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

// initial moviedb search
// app.get("/moviedb/search", async (req,res) => {
//   try {
//     let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${req.query.query}`
//     const response = await fetch(url)
//     const data = await response.json();
//     return res.json({
//       success: true,
//       data
//     })
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: err.message
//     })
//   }
// });

module.exports = app;

/*
TO READ:
https://medium.com/swlh/hide-api-key-in-node-application-and-request-it-from-react-application-175ce257f493
https://github.com/JacksonBates/good-relay-fe/blob/master/src/Component.js 
*/