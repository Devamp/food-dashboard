"use client"; // Add this line to mark the component as a Client Component

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// header and search bar component
const SearchBar = ({ onSearch }) => {
  // create a useState to saved user query string data within this current component
  const [searchQuery, setSearchQuery] = useState("");

  // upon user input, set the query varaible with the most recent value
  const handleSearch = (query) => {
    setSearchQuery(query.target.value);
  };

  // upon button click, return the current user query back to the parent component via onSearch function
  const handleSubmit = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="text-center">
      <p className="block text-4xl mb-4 font-bold text-green-600 py-5">
        TRACK YOUR DAILY CALORIE INTAKE
      </p>
      <label for="searchBar" className="text-l font-semibold ">
        Search your daily intake to keep track of your daily calorie intake{" "}
      </label>
      <div className="flex mt-8 w-full h-auto justify-center">
        <input
          type="text"
          id="searchBar"
          className="p-2 rounded-lg focus:outline-black bg-gray-700 w-2/4 text-l text-white"
          placeholder="Search for a food item..."
          onChange={handleSearch}
          required
        />

        <button
          type="submit"
          id="submitButton"
          className="flex items-center text-white bg-green-700 ml-3 pl-4 pr-5 text-xl rounded-lg hover:bg-green-600"
          onClick={handleSubmit}
        >
          <div>
            <FontAwesomeIcon
              icon={faSearch}
              height={20}
              width={20}
              color="white"
              className="mr-1"
            />
          </div>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
