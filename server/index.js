const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());
const session = require('express-session');
let arr = ["hello", "world"];
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

const tokenRefreshMiddleware = (req, res, next) => {
  const now = new Date().getTime();
  if (req.session.user && req.session.user.expiryTime && req.session.user.expiryTime - now < 60000) { // 60 seconds buffer
      // Refresh the token
      spotifyApi.setRefreshToken(req.session.user.refreshToken);
      spotifyApi.refreshAccessToken().then(data => {
          req.session.user.accessToken = data.body['access_token'];
          req.session.user.expiryTime = now + data.body['expires_in'] * 1000;

          spotifyApi.setAccessToken(data.body['access_token']);

          next();
      }).catch(error => {
          console.error('Error refreshing access token', error);
          res.status(401).send('Unauthorized');
      });
  } else {
      next();
  }
};

app.get('/v1/me', tokenRefreshMiddleware, (req, res) => {
  spotifyApi.getMe().then(data => {
    console.log(data.body);
    res.send(data.body);
  }).catch(error => {
    console.error('Error getting user', error);
    res.status(500).send('Error getting user');
  });
});

app.get('/home', async (req, res) => {
  res.send("This is data for home page");
  //res.send(arr);
});

// Redirect users to this endpoint for Spotify login
app.get('/login', (req, res) => {
  const scopes = ['user-read-private', 'user-read-email', 'playlist-read-private'];
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
  
}); 

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send('Could not log out, please try again');
    } else {
      res.send("Logged out");
    }
  });
});
// Spotify will redirect users to this endpoint after login
app.get('/callback', (req, res) => {
  const error = req.query.error;
  const code = req.query.code;

  if (error) {
    console.error('Callback Error:', error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi.authorizationCodeGrant(code).then(data => {
    const accessToken = data.body['access_token'];
    const refreshToken = data.body['refresh_token'];
    const expiresIn = data.body['expires_in'];
    const expiryTime = new Date().getTime() + expiresIn * 1000;

    req.session.user = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresIn: expiresIn,
      expiryTime: expiryTime
    };

    //console.log(req.session)

    spotifyApi.setAccessToken(accessToken);
    spotifyApi.setRefreshToken(refreshToken);

    // console.log('access_token:', accessToken);
    // console.log('refresh_token:', refreshToken);

    // Set the access token on the API object to use it in later calls
    //res.send('Success! You can now close the window.');
    res.redirect(`http://localhost:3000?loggedIn=true`);

  }).catch(error => {
    console.error('Error getting Tokens:', error);
    res.send(`Error getting Tokens: ${error}`);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
