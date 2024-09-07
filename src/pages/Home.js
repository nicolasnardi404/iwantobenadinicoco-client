import React from "react";
import Poems from "../components/Poems";
import Header from "../components/Header";
import "../App.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Pagination from "../components/Pagination";
import { useState } from "react";
import { inject } from "@vercel/analytics";

export default function Home() {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  inject();

  function handleClick(e, url) {
    e.preventDefault();
    history.push(`/${url}`);
  }

  return (
    <div className="App">
      <Header />
      <div className="btn-container">
        <button className="about-btn" onClick={(e) => handleClick(e, "about")}>
          WHAT AM I AI
        </button>
        <button className="about-btn" onClick={(e) => handleClick(e, "donate")}>
          SUPPORT THIS PROJECT
        </button>
      </div>
      <Pagination onPageChange={(pageNumber) => setCurrentPage(pageNumber)} />
      <Poems />
    </div>
  );
}
