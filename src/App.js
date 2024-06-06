import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [poem, setPoem] = useState('');
  const [allPoems, setAllPoems] = useState([]);

  const fetchPoems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/');
      const poemsArray = Array.isArray(response.data) ? response.data : [];
      const sortedPoems = poemsArray.sort((a, b) => new Date(b.date) - new Date(a.date));
      setAllPoems(sortedPoems);
    } catch (error) {
      console.error("Failed to fetch poems:", error);
    }
  };

  const generateAndSavePoem = async () => {
    try {
      const poemResponse = await axios.get('http://localhost:8080/generate-poem');
      setPoem(poemResponse.data.poem);

      alert('Poem saved successfully and image generated');
      fetchPoems();
    } catch (error) {
      console.error("Failed to generate or save poem and/or image:", error);
    }
  };

  useEffect(() => {
    fetchPoems();
  }, []);

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: 'var(--primary-color)', color: 'red' }}>
        <h1>I WANT TO BE NADI NICOCO</h1>
        <button className="btn btn-primary" onClick={generateAndSavePoem}>Generate & Save Poem</button>
      </header>
      <main className="App-main">
      {allPoems.map((poemObject, index) => (
        <section key={poemObject.id || index} className={`poem-block poem-${index}`} style={{ backgroundColor: 'var(--secondary-color)' }}>
          <h2>Poem {poemObject.id || (index + 1)}</h2>
          <div className="poem-text">
            <p>Date: {new Date(poemObject.date).toLocaleDateString()}</p>
            <p>Time: {new Date(poemObject.date).toLocaleTimeString()}</p>
            {poemObject.poem.split("\n").map((line, index) => (
              <p key={index}>{line}<br /></p>
            ))}
          </div>
        </section>
      ))}
      </main>
    </div>
  );
}
export default App;
