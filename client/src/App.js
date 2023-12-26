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
        console.log("logged out")
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
        {user && <p>{user.display_name}</p>}
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button>
      </header>
    </div>
  );
}

export default App;
