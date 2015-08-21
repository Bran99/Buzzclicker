require('dotenv').load();

var express = require('express'),
    app = express(),
    ejs = require('ejs'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    expressLayouts = require('express-ejs-layouts'),
    morgan = require('morgan'),
    session = require('express-session');

var PORT = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(morgan('short'));
app.use(express.static('./public'));

app.use(expressLayouts);
app.use(session({
  secret : process.env.SESSION_SECRET,
  resave : false,
  saveUninitialized : false
}));

app.use(bodyParser.json());
app.use(methodOverride('_method'));

var buzzclickersController = require('./controllers/buzzclickers.js');
app.use('/', buzzclickersController)

app.listen(PORT, function () {
  console.log('SERVER IS UP ON PORT', PORT);
});
