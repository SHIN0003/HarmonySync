import './App.css';
import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = React.useState("");
  const [home, setHome] = React.useState("");

  useEffect(() => {
    // Using Axios for GET request
    async function getHome() {
      try {
        const response = await axios.get('http://localhost:3000/home');
        setHome(response.data); // Axios automatically handles the response as JSON
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    }
    getHome();
  }, []);

  async function postName() {
    try {
      // Using Axios for POST request
      const response = await axios.post('http://localhost:3000/post_name', { name });
      console.log(response.data); // Axios automatically handles sending data as JSON
    } catch (error) {
      console.error('Error posting name:', error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <button onClick={postName}>Submit</button>
        <p>{home}</p>
      </header>
    </div>
  );
}

export default App;
