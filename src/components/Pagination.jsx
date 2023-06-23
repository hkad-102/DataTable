import React from "react";

const Pagination = ({ pageNumbers, currentPage, setCurrentPage }) => {
    const handleClickPage = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
  return (
    <ul className="flex justify-center">
      {pageNumbers.map((item) => {
        return (
          <li
            key={item}
            onClick={() => handleClickPage(item)}
            className={`border border-black p-2 w-10 flex items-center justify-center h-10 ${
              item === currentPage ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
