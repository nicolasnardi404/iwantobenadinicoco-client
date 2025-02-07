import React, { useState, useEffect } from "react";
import axios from "axios";

const Pagination = ({ currentPage, onPageChange }) => {
  const [totalPages, setTotalPages] = useState(0);

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

  const pageNumbers = [...Array(totalPages).keys()].reverse().map((i) => i + 1);

  return (
    <nav>
      <div className="pagination">
        <p>PAGES:</p>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`page-link ${pageNumber === currentPage ? "currentPage" : ""}`}
          >
            {console.log("page" + pageNumber)}
            {console.log("current" + currentPage)}
            {pageNumber}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Pagination;
