import React from "react";
import Poems from "../components/Poems";
import Header from "../components/Header";
import "../App.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Pagination from "../components/Pagination";
import { useState } from "react";

export default function Home() {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);

  function handleClick(e) {
    e.preventDefault();
    history.push("/about");
  }

  return (
    <div className="App">
      <Header />
      <div className="btn-container">
        <button className="about-btn" onClick={handleClick}>
          WHAT AM I AI
        </button>
      </div>
      <Pagination onPageChange={(pageNumber) => setCurrentPage(pageNumber)} />
      <Poems />
    </div>
  );
}
