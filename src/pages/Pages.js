import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Header from "../components/Header";
import Pagination from "../components/Pagination";

const Pages = () => {
  const { pageNumber } = useParams(); // Current page number from URL
  const [poems, setPoems] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/poems?page=${pageNumber}`
        );
        setPoems(response.data.reverse());
      } catch (error) {
        console.error("Error fetching poems:", error);
      }
    };

    fetchPoems();
  }, [pageNumber]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handlePageChange = (pageNumber) => {
    history.push(`/pages/${pageNumber}`);
  };

  return (
    <div className="App">
      <Header />
      <div className="btn-container">
        <button className="about-btn" onClick={() => history.push("/about")}>
          WHAT AM I
        </button>
      </div>
      <Pagination
        currentPage={parseInt(pageNumber)}
        onPageChange={handlePageChange}
      />
      <div>
        {poems.map((poemObject, index) => (
          <div className="poem-block" key={index}>
            <div className="poem-title">
              <h2>Poem {poemObject.id || index + 1}</h2>
              <div className="data-poem">
                <p>Date: {formatDate(poemObject.date)}</p>
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
