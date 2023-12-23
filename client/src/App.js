import './App.css';
import React, { useEffect } from 'react';

function App() {
  const [name, setName] = React.useState("");
  const[home, setHome] = React.useState("");

  useEffect(() => {
    async function getHome() {
      const response = await fetch('http://localhost:3000/home');
      const content = await response.text();
      setHome(content);
    }
    getHome();
  }, []);

  async function postName() {
    const response = await fetch('http://localhost:3000/post_name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });
    const content = await response.json();
    console.log(content);
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