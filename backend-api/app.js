var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors')
require('dotenv').config()

var apiRouter = require('./src/routes');
var adminRouter = require('./src/routes/admin');
var databaseRouter = require('./src/database/seed/seed.route');

//middleware
var { Admin } = require('./src/middlewares');
const corsOpts = require('./src/cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');

// express-session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/src/public')));
app.use('/axios', express.static(path.join(__dirname, 'node_modules', 'axios')));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors(corsOpts))

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  ACCESS_TIMEOUT,
  MONGODB_URL,
  DB_USERNAME,
  DB_PASSWORD
} = process.env;

// const mongoUrl = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=${DB_NAME}`;
const mongoUrl = MONGODB_URL;

const db = mongoose.connection;

const connectWithRetry = function () {
  return mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }, (err) => {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err)
      setTimeout(connectWithRetry, ACCESS_TIMEOUT)
    }
  })
}
connectWithRetry()

db.on('connected', () => {
  console.log('Connect DB Successful');
})

//Router
app.use('/database/create-database', databaseRouter);
app.use('/api', apiRouter);

app.use(Admin.Message.isMessage);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  console.log(err);

  if (err.status === 404) {
    return res.render('404');
  } else {
    return res.render('500');
  }
});

module.exports = app;
