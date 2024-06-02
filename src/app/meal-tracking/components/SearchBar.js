"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query

  const handleSearch = (event) => {
    setSearchQuery(event.target.value); // Update the search query state
  };

  const handleSubmit = () => {
    onSearch(searchQuery); // Call the onSearch prop with the current search query
  };

  return (
    <div className="text-left mb-8">
      <label className="block text-l font-semibold pl-40 pb-4">
        Search for food items to add to your list and track your daily calorie
        intake.
      </label>
      <div className="flex justify-center items-center">
        {" "}
        <input
          type="text"
          className="p-2 rounded-lg focus:outline-black bg-gray-700 text-white w-full max-w-lg"
          placeholder="Search for a food item..."
          onChange={handleSearch}
          value={searchQuery}
          required
        />
        <button
          type="submit"
          className="flex items-center text-white bg-green-700 ml-3 p-2 rounded-lg hover:bg-green-600"
          onClick={handleSubmit}
        >
          <FontAwesomeIcon
            icon={faSearch}
            height={20}
            width={20}
            color="white"
          />{" "}
          <span className="ml-2">Search</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
