var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var testRouter = require('./routes/test');
var userRouter = require('./routes/user');
var { secretKey } = require('./util/constant');
var app = express();
const { expressjwt } = require('express-jwt');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 静态资源
app.use(express.static(path.join(__dirname, 'dist')));
app.use(
  expressjwt({
    secret: secretKey,
    algorithms: ['HS256']
  }).unless({
    path: ['/user/login']
  })
);
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Keep-Alive', 'timeout=60,max=1000');
  res.header('Connection', 'keep-alive');
  next();
});
app.use('/', indexRouter);
app.use('/api/test', testRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log(2);
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error =
    req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    code: err.status || 500,
    data: '未知异常'
  });
  // res.render('error');
});

module.exports = app;
