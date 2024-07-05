import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Poems() {
  const [allPoems, setAllPoems] = useState([]);

  const fetchPoems = async () => {
    try {
      const response = await axios.get("https://api.iwannabenadinicoco.com/");
      const poemsArray = Array.isArray(response.data) ? response.data : [];
      const sortedPoems = poemsArray.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setAllPoems(sortedPoems);
    } catch (error) {
      console.error("Failed to fetch poems:", error);
    }
  };

  useEffect(() => {
    fetchPoems();
  }, []);

  return (
    <div>
      {allPoems.map((poemObject, index) => (
        <div className="poem-block">
          <div className="poem-title">
            <h2>Poem {poemObject.id || index + 1}</h2>
            <div className="data-poem">
              <p>Date: {new Date(poemObject.date).toLocaleDateString()}</p>
              <p>Time: {new Date(poemObject.date).toLocaleTimeString()}</p>
            </div>
          </div>
          {poemObject.poem.split("\n").map((line, index) => (
            <p className="poem" key={index}>
              {line}
              <br />
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
