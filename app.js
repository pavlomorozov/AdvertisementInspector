var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require("mysql");

var indexRouter = require('./routes/index');
var lastAdvertisementsRouter = require('./routes/last-advertisements');
var keyStatisticsRouter = require('./routes/key-statistics');
var advertisementsViewTableRouter = require('./routes/advertisements-view-table');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var dbConfig = {
	connectionLimit : 10,
	host     : '192.168.100.10',
	user     : 'olx_user',
	password : 'ghRd2#ju',
	database : 'olxdb',
	typeCast: function castField( field, useDefaultTypeCasting ) {
		// We only want to cast bit fields that have a single-bit in them. If the field
		// has more than one bit, then we cannot assume it is supposed to be a Boolean.
		if ((field.type === "BIT") && (field.length === 1)) {
			var bytes = field.buffer();
			// A Buffer in Node represents a collection of 8-bit unsigned integers.
			// Therefore, our single "bit field" comes back as the bits '0000 0001',
			// which is equivalent to the number 1.
			return (bytes[0] === 1);
		}
		return( useDefaultTypeCasting() );
	}
};

app.use(function(req, res, next){
	res.locals.mySQLPool = mysql.createPool(dbConfig);

/*
	res.locals.connection.connect(error => {
		if (err){
			console.log('Connection is asleep (time to wake it up): ', err);
			res.locals.handleMySQLDisconnect();
		}
	});
	*/
	next();
});


app.use('/', indexRouter);
app.use('/api/last-advertisements', lastAdvertisementsRouter);
app.use('/api/key-statistics', keyStatisticsRouter);
app.use('/api/advertisements-view-table', advertisementsViewTableRouter);

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
  res.render('error');
});

module.exports = app;
