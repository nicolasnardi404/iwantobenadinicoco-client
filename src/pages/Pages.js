import React, { useEffect, useState } from "react";
import axios from "axios"; // Make sure to import axios
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Pages = () => {
  const { pageNumber } = useParams();
  const [poems, setPoems] = useState([]);
  const [currentPage, setCurrentPage] = useState(pageNumber || 1);
  const history = useHistory();

  function handleClick(e) {
    e.preventDefault();
    history.push("/about");
  }

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const response = await axios.get(
          `https://api.iwannabenadinicoco.com/poems?page=${currentPage}`
        );
        setPoems(response.data.reverse());
      } catch (error) {
        console.error("Error fetching poems:", error);
      }
    };

    fetchPoems();
  }, [currentPage]);

  return (
    <div className="App">
      <Header />
      <div className="btn-container">
        <button className="about-btn" onClick={handleClick}>
          WHAT AM I
        </button>
      </div>
      <Pagination onPageChange={(pageNumber) => setCurrentPage(pageNumber)} />
      <div>
        {poems.map((poemObject, index) => (
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
    </div>
  );
};
export default Pages;
