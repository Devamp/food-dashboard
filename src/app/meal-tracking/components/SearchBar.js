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
    <div className="text-left mb-8 ">
      {/* <div className="flex flex-col bg-slate-900 rounded-2xl mb-8 p-8"> */}
      <label className=" block text-center marker:text-l font-semibold py-4 text-orange-500">
        Search for food items to add to your list and track your daily calorie
        intake.
      </label>
      <div className="flex justify-center items-center">
        {" "}
        <input
          type="text"
          className="p-2 rounded-lg focus:outline-black bg-gray-700 text-white w-full max-w-lg"
          placeholder="Search for your intake food..."
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
