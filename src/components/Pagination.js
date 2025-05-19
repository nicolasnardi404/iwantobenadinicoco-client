import React, { useState, useEffect } from "react";
import axios from "axios";

const Pagination = ({ currentPage, onPageChange }) => {
  const [totalPages, setTotalPages] = useState(0);
  const [visibleStart, setVisibleStart] = useState(0);

  useEffect(() => {
    const fetchPoemsAndSetPages = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/count`
        );
        const totalCount = response.data;
        const totalPages = Math.ceil(totalCount / 10);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Error fetching poems:", error);
      }
    };

    fetchPoemsAndSetPages();
  }, []);

  // Calculate how many pages to show
  const maxVisiblePages = 5;

  // Handle navigation through pages
  const handlePrevNav = () => {
    if (visibleStart > 0) {
      setVisibleStart(visibleStart - 1);
    }
  };

  const handleNextNav = () => {
    if (visibleStart < totalPages - maxVisiblePages) {
      setVisibleStart(visibleStart + 1);
    }
  };

  const getPageNumbers = () => {
    let visiblePages = [];

    if (totalPages <= maxVisiblePages) {
      // If total pages are less than max visible, show all pages in descending order
      visiblePages = [...Array(totalPages).keys()].map((i) => totalPages - i);
    } else {
      // Calculate visible range based on current visibleStart
      const startIdx = Math.min(
        totalPages - maxVisiblePages,
        Math.max(0, visibleStart)
      );

      // Always include last page first
      visiblePages = [totalPages];

      // Add descending pages from calculated start position
      const startPage = totalPages - 1 - startIdx;
      const endPage = Math.max(2, startPage - (maxVisiblePages - 3));

      // Add ellipsis after start if needed
      if (startPage < totalPages - 1) {
        visiblePages.push("...");
      }

      // Add pages in descending order
      for (let i = startPage; i >= endPage; i--) {
        visiblePages.push(i);
      }

      // Add ellipsis before end if needed
      if (endPage > 2) {
        visiblePages.push("...");
      }

      // Add first page
      if (totalPages > 1) {
        visiblePages.push(1);
      }
    }

    return visiblePages;
  };

  // Don't render pagination if there's only 1 page
  if (totalPages <= 1) return null;

  return (
    <nav>
      <div className="pagination">
        <p>PAGES:</p>

        {/* Previous navigation button */}
        <button
          className="nav-button"
          onClick={handlePrevNav}
          disabled={visibleStart === 0 || totalPages <= maxVisiblePages}
        >
          &lt;
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((pageNumber, index) =>
          pageNumber === "..." ? (
            <span key={`ellipsis-${index}`} className="ellipsis">
              ...
            </span>
          ) : (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`page-link ${pageNumber === currentPage ? "currentPage" : ""}`}
            >
              {pageNumber}
            </button>
          )
        )}

        {/* Next navigation button */}
        <button
          className="nav-button"
          onClick={handleNextNav}
          disabled={
            visibleStart >= totalPages - maxVisiblePages ||
            totalPages <= maxVisiblePages
          }
        >
          &gt;
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
