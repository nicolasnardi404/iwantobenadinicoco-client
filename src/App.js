import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [poem, setPoem] = useState('');
  const [allPoems, setAllPoems] = useState([]);

  const fetchPoems = async () => {
    try {
      const response = await axios.get('http://localhost:8080/');
      const poemsArray = Array.isArray(response.data)? response.data : [];
      // Sort poems in descending order by date
      const sortedPoems = poemsArray.sort((a, b) => new Date(b.date) - new Date(a.date));
      setAllPoems(sortedPoems);
    } catch (error) {
      console.error("Failed to fetch poems:", error);
    }
  };
  

  const generateAndSavePoem = async () => {
    try {
      const response = await axios.get('http://localhost:8080/generate-poem');
      const poemGenerated = response.data.poem.replace(/\n/g, '<br />');
      setPoem(poemGenerated);
      alert('Poem saved successfully');
      fetchPoems(); // Refresh poems after generating a new one
    } catch (error) {
      console.error("Failed to generate or save poem:", error);
    }
  };

  useEffect(() => {
    fetchPoems();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <button onClick={generateAndSavePoem}>Generate & Save Poem</button>
        <h2>All Poems:</h2>
        {allPoems.map((poemObject, index) => (
          <div key={poemObject.id || index} className={`poem-block poem-${index}`}> {/* Assuming poemObject has an id field */}
            <div className="poem-info">
              <span>ID: {poemObject.id || (index + 1)}</span><br /> {/* Display ID if available, otherwise fall back to index */}
              <span>Date: {new Date(poemObject.date).toLocaleDateString()}</span><br />
              <span>Time: {new Date(poemObject.date).toLocaleTimeString()}</span>
            </div>
            <br />
            <div className="poem-text">
              {poemObject.poem.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
            </div>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
