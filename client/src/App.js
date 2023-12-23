import './App.css';
import React from 'react';

function App() {
  const [name, setName] = React.useState("");

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
      </header>

    </div>
  );
}
export default App;