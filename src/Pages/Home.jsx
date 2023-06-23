import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerpage] = useState(10);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      const data = res.data;
      setData(data);
      setFilteredData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (e) => {
    const key = e.target.value.toLowerCase();
    const searchResult = data.filter(
      (item) =>
        item.title.toLowerCase().includes(key) ||
        item.body.toLowerCase().includes(key)
    );
    setFilteredData(searchResult);
    setCurrentPage(1);
  };

  const sortedData = filteredData.sort((a, b) => {
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (col) => {
    if (sortColumn === col) {
      setOrder(order === "asc" ? "dec" : "asc");
    } else {
      setSortColumn(col);
      setOrder("asc");
    }
  };

  //pagination
  const lastItemIndex = currentPage * itemsPerpage;
  const FirstItemIndex = lastItemIndex - itemsPerpage;
  const currentItems = filteredData.slice(FirstItemIndex, lastItemIndex);

  const totalPage = Math.ceil(filteredData.length / itemsPerpage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  const handleClickPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-10 bg-indigo-400">
      <h2 className="text-center font-bold text-3xl text-white ">Table Page</h2>
      <div className="w-full flex justify-center mt-10">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          className=" border-black border px-3 py-2 outline-none mb-4 w-[500px] rounded-xl"
        />
      </div>
        {filteredData.length === 0 ? (
            <div className="text-white text-xl font-bold h-screen">
                <p>No data found...</p>
                <p>Try Something Different</p>
            </div>
        ) : (
            
            <table className="table-fixed bg-white">
              <thead className="border">
                <tr className="h-20">
                  <th onClick={() => handleSort("id")} className="border">
                    ID
                  </th>
                  <th onClick={() => handleSort("title")} className="border">
                    Title
                  </th>
                  <th onClick={() => handleSort("body")} className="border">
                    Body
                  </th>
                  <th onClick={() => handleSort("userId")} className="border">
                    User ID
                  </th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody className="border">
                {currentItems.map((item) => {
                  const { id, title, body, userId } = item;
                  return (
                    <tr className="border" key={id}>
                      <td className="w-20 p-2 border text-center">{id}</td>
                      <td className="w-[250px] p-4 border">
                        {title}
                      </td>
                      <td className="border p-4 w-1/2">{body}</td>
                      <td className="border text-center">{userId}</td>
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
        )}
      <div className="mt-10 w-full">
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
      </div>
    </div>
  );
};

export default Home;
