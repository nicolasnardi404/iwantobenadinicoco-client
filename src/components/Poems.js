import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Poems({ page = 1 }) {
  const [allPoems, setAllPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const fetchPoems = async (pageNum) => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}`);
      const poemsArray = Array.isArray(response.data) ? response.data : [];
      setAllPoems(poemsArray);
    } catch (error) {
      console.error("Failed to fetch poems:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoems(page);
  }, [page]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (loading) {
    return <div className="loading">Loading poems...</div>;
  }

  return (
    <div>
      {allPoems.length === 0 ? (
        <div className="no-poems">No poems found.</div>
      ) : (
        allPoems.map((poemObject, index) => (
          <div
            key={poemObject.id || index}
            className="poem-block"
            onClick={() => history.push(`/poem/${poemObject.token}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="poem-title">
              <div>
                <h2>Poem {poemObject.id || index + 1}</h2>
              </div>
              <div className="data-poem">
                <p>Date: {formatDate(poemObject.date)}</p>
                <p>Time: {new Date(poemObject.date).toLocaleTimeString()}</p>
              </div>
            </div>
            <div className="poem">
              {poemObject.poem.split("\n").map((line, lineIndex) => (
                <p key={lineIndex}>{line}</p>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
