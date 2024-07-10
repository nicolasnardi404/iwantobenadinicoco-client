import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; // Import useHistory

const Pagination = ({ onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const history = useHistory(); // Use the useHistory hook

  useEffect(() => {
    const fetchPoemsAndSetPages = async () => {
      try {
        const response = await axios.get(
          "https://api.iwannabenadinicoco.com/count"
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

  const handleChangePage = (pageNumber) => {
    const url = `/pages/${pageNumber}`;
    history.push(url); // This line may be removed if onPageChange is sufficient
    onPageChange(pageNumber); // Call the passed callback function
  };

  const pageNumbers = [...Array(totalPages).keys()].reverse().map((i) => i + 1);

  return (
    <nav>
      <div className="pagination">
        <p>PAGES:</p>
        {pageNumbers.map((pageNumber) => (
          <button
            onClick={() => handleChangePage(pageNumber)}
            className="page-link"
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Pagination;
