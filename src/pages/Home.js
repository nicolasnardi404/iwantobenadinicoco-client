import React from "react";
import Poems from "../components/Poems";
import Header from "../components/Header";
import "../App.css";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import Pagination from "../components/Pagination";
import { useState, useEffect } from "react";
import { inject } from "@vercel/analytics";

export default function Home() {
  const history = useHistory();
  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page) : null);
  inject();

  // Update currentPage when URL param changes
  useEffect(() => {
    if (page) {
      setCurrentPage(parseInt(page));
    } else {
      setCurrentPage(null); // No active page on home route
    }
  }, [page]);

  function handleClick(e, url) {
    e.preventDefault();
    history.push(`/${url}`);
  }

  const handlePageChange = (pageNumber) => {
    history.push(`/pages/${pageNumber}`);
  };

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
      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
      <Poems page={currentPage || 1} /> {/* Use page 1 on home route */}
    </div>
  );
}
