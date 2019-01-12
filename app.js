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
var OAuth2 = require('oauth').OAuth2;
var oauth2 = new OAuth2("380906782469469",
  "657e49b5f03c04cdf3dfeeae1362c39e",
  "", "https://www.facebook.com/dialog/oauth",
  "https://graph.facebook.com/oauth/access_token",
  null);

app.get('/facebook/auth', function (req, res) {
  var redirect_uri = "https://facebook-tunnel.tk/facebook/callback";
  // For eg. "http://localhost:3000/facebook/callback"
  var params = {'redirect_uri': redirect_uri, 'scope': 'manage_pages,publish_pages'};
  res.redirect(oauth2.getAuthorizeUrl(params));
});

app.get("/facebook/callback", function (req, res) {
  if (req.error_reason) {
    res.send(req.error_reason);
  }
  if (req.query.code) {
    var loginCode = req.query.code;
    var redirect_uri = "/facebook/callback";
    // For eg. "/facebook/callback"
    oauth2.getOAuthAccessToken(loginCode,
      {
        grant_type: 'authorization_code',
        redirect_uri: redirect_uri
      },
      function (err, accessToken, refreshToken, params) {
        if (err) {
          console.error(err);
          res.send(err);
          return;
        }
        res.send(accessToken + ';' + params.expires);
        return;
      }
    );
  } else {
    console.log(1111);
  }
});

module.exports = app;
