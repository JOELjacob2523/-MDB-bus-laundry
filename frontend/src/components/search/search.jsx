import "./search.css";
import { Input } from "antd";
import React, { useState } from "react";

const { Search } = Input;

const SearchBar = ({ input, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const onSearchChange = (value) => {
    const query = value.toLowerCase();
    const results = input.filter((user) => {
      return Object.values(user).some(
        (field) =>
          field &&
          typeof field === "string" &&
          field.toLowerCase().includes(query)
      );
    });
    onSearch(results);
  };

  return (
    <div className="search_container">
      <Search
        className="search_bar"
        placeholder="Type to search..."
        value={searchQuery}
        size="large"
        allowClear={true}
        onChange={(e) => setSearchQuery(e.target.value)}
        onSearch={onSearchChange}
      />
    </div>
  );
};

export default SearchBar;
