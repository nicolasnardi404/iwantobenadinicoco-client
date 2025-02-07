import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

export default function PoemPage() {
  const [poem, setPoem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchPoem = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/poem/${token}`
        );
        setPoem(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching poem:", error);
        setLoading(false);
      }
    };

    fetchPoem();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (!poem) return <div>Poem not found</div>;

  return (
    <div className="App">
      <Header />
      <div className="btn-container">
        <button className="about-btn" onClick={() => history.push("/home")}>
          BACK TO POEMS
        </button>
      </div>
      <div className="poem-block">
        <div className="poem-title">
          <h2>Poem {poem.id}</h2>
          <div className="data-poem">
            <p>Date: {new Date(poem.date).toLocaleDateString()}</p>
            <p>Time: {new Date(poem.date).toLocaleTimeString()}</p>
          </div>
        </div>
        <div className="poem">
          {poem.poem.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
