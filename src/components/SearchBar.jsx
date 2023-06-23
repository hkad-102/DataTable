import React from "react";

const SearchBar = ({ data, setFilteredData, setCurrentPage }) => {
  const handleSubmit = (e) => e.preventDefault();
  const handleSearch = (e) => {
    let key = e.target.value.toLowerCase();

    const resultsArray = data.filter(
      (item) =>
        item.title.toLowerCase().includes(key) ||
        item.body.toLowerCase().includes(key)
    );

    setFilteredData(resultsArray);
    setCurrentPage(1);
  };
  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search from the table..."
          className="border-black border px-3 py-2 outline-none mb-4 w-[500px] rounded-xl"
          onChange={handleSearch}
        />
      </form>
    </header>
  );
};

export default SearchBar;
