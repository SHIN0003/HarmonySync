const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors({
  origin: process.env.FRONT_URL, // adjust if your frontend port is different
  credentials: true
}));

// Redis setup
// const { createClient } = require('redis');
// const redisClient = createClient({
//   url: 'rediss://red-cmcp61f109ks73921rng:WbyyCCp36c1oIHIO5irK8nwAN0nlyU5P@ohio-redis.render.com:6379',
//   legacyMode: true// Your Redis URL
// });
// redisClient.connect().catch(console.error);
// const RedisStore = require('connect-redis')(session);
// Session setup with Redis
const session = require('express-session');

// app.use(session({
//   store: new RedisStore({ client: redisClient }),
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false, // You can set this to false to comply with laws that require permission before setting a cookie
//   cookie: {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production", // Should be true if using HTTPS
//   }
//   // Add other configurations as needed
// }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true
  }
}));

// redisClient.on('connect', () => console.log('Redis client connected'));
// redisClient.on('error', (err) => console.log('Redis Client Error', err));

// Serve static files from the React app
//app.use(express.static(path.join(__dirname, '../../client/build')));

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

// have to rewrite this to because I am not storing token in spotifyApi object
app.post('/refresh', (req, res) => {
  const refreshToken = req.session.user.refreshToken;
  spotifyApi.setRefreshToken(refreshToken);
  spotifyApi.refreshAccessToken().then(data => {
    res.json({
      accessToken: data.body['access_token'],
      expiresIn: data.body['expires_in']
    });
  }).catch(error => {
    console.error('Error refreshing access token:', error);
    res.status(500).json({ error: 'Error refreshing access token' });
  });
} );

app.get('/api/token', (req, res) => {
  if (req.session.user && req.session.user.accessToken) {
    console.log("sending token")
    res.json({ accessToken: req.session.user.accessToken });
  } else {
    res.status(401).json({ error: 'Unauthorized: No active session' });
  }
});

// Redirect users to this endpoint for Spotify login, then redirect them to the /callback endpoint
app.get('/login', (req, res) => {
  const scopes = ['user-read-private', 'user-read-email', 'playlist-read-private', 'playlist-modify-private', 'playlist-modify-public'];
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
  
}); 

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send('Could not log out, please try again');
    } else {
      res.clearCookie('connect.sid', { path: '/' });
      res.status(200).send('Logged out');
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

    req.session.save(err => {
      if (err) {
        console.error('Error saving session:', err);
        res.send(`Error saving session: ${err}`);
      } else {        
        console.log("saved")
        console.log(req.session.user)
        // In your Express route after successful authentication
        res.redirect(`${process.env.FRONT_URL}/auth/callback`);
      }
    });
  }).catch(error => {
    console.error('Error getting Tokens:', error);
    res.send(`Error getting Tokens: ${error}`);
  });
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});