import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  
  const [home, setHome] = React.useState("");
  const [user, setUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  async function fetchTokens() {
    try {
      const response = await axios.get('http://localhost:3001/api/token', { withCredentials: true });
      const accessToken = response.data.accessToken;
      // Store the access token in the state or context for further use
      // ...
      console.log("access token received" + accessToken)
      setAccessToken(accessToken);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  }

  useEffect(() => {
    // Using Axios for GET request
    if (isLoggedIn && accessToken) {
      async function getUser() {
        try {
          console.log(isLoggedIn)
          console.log("access token in get user")
          const spotifyResponse = await axios.get('https://api.spotify.com/v1/me', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
          });
          setUser(spotifyResponse.data); // Axios automatically handles the response as JSON
          
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      getUser();
    }
  }, [accessToken, isLoggedIn]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('loggedIn') === 'true') {
      setIsLoggedIn(true);
      fetchTokens();
      // Optionally, clear the query params from the URL
    }
    else {
      setIsLoggedIn(false);
    }
  }, []);
  
  //home page data
  useEffect(() => {
    // Using Axios for GET request
    async function getHome() {
      try {
        const response = await axios.get('http://localhost:3001/home');
        setHome(response.data); // Axios automatically handles the response as JSON
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    }
    getHome();
  }, []);

  //handles login and redirects to spotify login page
  function handleLogin() {
    window.location.href = 'http://localhost:3001/login';
  }

  
  async function handleLogout() {
    try {
      await axios.post('http://localhost:3001/logout').then(res => {
        setIsLoggedIn(false);
        console.log(res)
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="top-right">
          {isLoggedIn && user && (
            <div className="user-info">
              <img src={user.images[0].url} alt="User" className="user-image" />
              <p className="user-name">{user.display_name}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}

          {!isLoggedIn && (
            <button onClick={handleLogin}>Login</button>
          )}
        </div>

        <p>{home}</p>
      </header>
    </div>
  );
}

export default App;