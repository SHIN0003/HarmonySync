import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  
  const [home, setHome] = React.useState("");
  const [user, setUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Using Axios for GET request
    if (isLoggedIn) {
      async function getUser() {
        try {
          const response = await axios.get('http://localhost:3001/v1/me');
          setUser(response.data); // Axios automatically handles the response as JSON
          
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      getUser();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('loggedIn') === 'true') {
      setIsLoggedIn(true);
      // Optionally, clear the query params from the URL
    }
    else {
      setIsLoggedIn(false);
    }
  }, []);
  
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
        <p>{home}</p>
        {isLoggedIn ? (
          <div>
            {user ? <p>Welcome, {user.display_name}</p> : <p>Loading user data...</p>}
            {/* Other user information */}
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <p>Please log in.</p>
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </header>
    </div>
  );  
}

export default App;
