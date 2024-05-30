import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

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
      <header className="App-header">
        <button onClick={generateAndSavePoem}>Generate & Save Poem</button>
        {allPoems.map((poemObject, index) => (
          <div key={poemObject.id || index} className={`poem-block poem-${index}`}>
            <div className="poem-info">
              <span>Poem {poemObject.id || (index + 1)}</span><br />
              <span>Date: {new Date(poemObject.date).toLocaleDateString()}</span><br />
              <span>Time: {new Date(poemObject.date).toLocaleTimeString()}</span>
            </div>
            <br />
            <div className="poem-text">
            {poemObject.poem.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
