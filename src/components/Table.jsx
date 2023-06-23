import React from "react";
import { Link } from "react-router-dom";

const Table = ({ currentItems, handleSort }) => {
  const columnNames = ["ID", "Title", "Body", "User ID"];
  const handleClick = (column) => {
    handleSort(column === 'User ID' ? 'userId' : column.toLowerCase())
  }
  return (
    <table className="table-fixed bg-white">
      <thead className="border">
        <tr className="h-20">
          {columnNames.map((column) => (
            <th
              key={column}
              onClick={() => handleClick(column)}
              className="border cursor-pointer"
            >
              {column}
            </th>
          ))}
          <th>Details</th>
        </tr>
      </thead>
      <tbody className="border">
        {currentItems.map((item) => {
          const { id, title, body, userId } = item;
          return (
            <tr className="border h-32" key={id}>
              <td className="w-20 p-2 border text-center">{id}</td>
              <td className="w-[250px] p-4 border">{title}</td>
              <td className="border p-4 w-1/2">{body}</td>
              <td className="border text-center w-30">{userId}</td>
              <td className="border text-center">
                <Link
                  to={`/post/${id}`}
                  className="flex items-center justify-center gap-3 hover:text-blue-500"
                >
                  View Details{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                    />
                  </svg>
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
