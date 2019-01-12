let express = require('express');
let fs = require('fs');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

let indexRouter = require('./routes/index');
app.use('/', indexRouter);

// require route
fs.readdirSync('./routes').filter(file => {
  return (file.indexOf('.') !== 0) && file != 'index.js' && (file.slice(-3) === '.js');
}).forEach(file => {
  let routePath = ['./routes', file].join('/');
  let routeName = file.slice(0, file.length - 3).replace(/\./g, '/');
  app.use(`/${routeName}`, require(routePath));
});


// facebook test
var request = require('request');
var OAuth2 = require('oauth2').OAuth2;
var oauth2 = new OAuth2("293520914705715",
  "d20fbf5499786aea641fee27339d1f1d",
  "", "https://www.facebook.com/dialog/oauth",
  "https://graph.facebook.com/oauth/access_token",
  null);

app.get('/facebook/auth',function (req, res) {
  var redirect_uri = "https://facebook-tunnel.tk/callback";
  // For eg. "http://localhost:3000/facebook/callback"
  var params = {'redirect_uri': redirect_uri, 'scope':'user_about_me,publish_actions'};
  res.redirect(oauth2.getAuthorizeUrl(params));
});



module.exports = app;
