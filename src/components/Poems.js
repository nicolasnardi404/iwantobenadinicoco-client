import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Poems (){
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
        <div>
            {/* <button className="btn btn-primary" onClick={generateAndSavePoem}>Generate & Save Poem</button> */}
            {allPoems.map((poemObject, index) => (
        <div className="poem-block">
            <div className='poem-title'>
                <h2>Poem {poemObject.id || (index + 1)}</h2>
                <div className='data-poem'>
                    <p>Date: {new Date(poemObject.date).toLocaleDateString()}</p>
                    <p>Time: {new Date(poemObject.date).toLocaleTimeString()}</p>
                </div>
            </div>
            {poemObject.poem.split("\n").map((line, index) => (
            <p className="poem" key={index}>{line}<br /></p>
            ))}
        </div>
      ))}
        </div>
    )
}