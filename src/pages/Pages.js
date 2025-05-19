import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Header from "../components/Header";
import Pagination from "../components/Pagination";

const Pages = () => {
  const { pageNumber } = useParams(); // Current page number from URL
  const [poems, setPoems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const history = useHistory();
  const currentPageNumber = parseInt(pageNumber);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/poems?page=${pageNumber}`
        );
        setPoems(response.data.reverse());

        // Get total poems count to calculate total pages
        const countResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/count`
        );
        const totalCount = countResponse.data;
        setTotalPages(Math.ceil(totalCount / 10));
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

  // Custom pagination UI for Pages.js
  const renderCustomPagination = () => {
    if (totalPages <= 1) return null;

    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPageNumber - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pageNumbers = [];

    // Add last page with ellipsis if needed (in descending order: higher on left)
    if (endPage < totalPages) {
      pageNumbers.push(totalPages);
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }
    }

    // Add page numbers around current page in descending order
    for (let i = endPage; i >= startPage; i--) {
      pageNumbers.push(i);
    }

    // Add first page with ellipsis if needed
    if (startPage > 1) {
      if (startPage > 2) {
        pageNumbers.push("...");
      }
      pageNumbers.push(1);
    }

    return (
      <nav>
        <div className="pagination">
          <p>PAGES:</p>

          {/* Next page button (on left for higher pages) */}
          <button
            className="nav-button"
            onClick={() => handlePageChange(currentPageNumber + 1)}
            disabled={currentPageNumber === totalPages}
          >
            &lt;
          </button>

          {/* Page numbers */}
          {pageNumbers.map((page, index) =>
            page === "..." ? (
              <span key={`ellipsis-${index}`} className="ellipsis">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`page-link ${page === currentPageNumber ? "currentPage" : ""}`}
              >
                {page}
              </button>
            )
          )}

          {/* Previous page button (on right for lower pages) */}
          <button
            className="nav-button"
            onClick={() => handlePageChange(currentPageNumber - 1)}
            disabled={currentPageNumber === 1}
          >
            {" "}
            &gt;
          </button>
        </div>
      </nav>
    );
  };

  return (
    <div className="App">
      <Header />
      <div className="btn-container">
        <button className="about-btn" onClick={() => history.push("/about")}>
          WHAT AM I
        </button>
      </div>
      {renderCustomPagination()}
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
