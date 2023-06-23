import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Pagination from "../components/Pagination";


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

  

  filteredData.sort((a, b) => {
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


  return (
    <div className="p-10 bg-indigo-400">
      <h2 className="text-center font-bold text-3xl text-white ">Table Page</h2>
      <div className="w-full flex justify-center mt-10">
        <SearchBar data={data} setFilteredData={setFilteredData} setCurrentPage={setCurrentPage}/>
      </div>
        {filteredData.length === 0 ? (
            <div className="text-white text-xl font-bold h-screen">
                <p>No data found...</p>
                <p>Try Something Different</p>
            </div>
        ) : (
            <Table currentItems={currentItems} handleSort={handleSort}/>
        )}
      <div className="mt-10 w-full">
        <Pagination pageNumbers={pageNumbers} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </div>
    </div>
  );
};

export default Home;
