"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Food from "./fetch-foods";

// header and search bar component
const SearchBarHeader = ({ onSearch }) => {
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
    <div className="text-center bg-slate-900 shadow-lg rounded-2xl py-8 px-10">
      <p className="block text-5xl mb-4 font-bold text-green-400 ">
        EXPLORE NEW FOODS.
      </p>
      <label for="searchBar" className="text-lg text-white ">
        Search for your favorite foods below and learn more about them and their
        nutritional importance{" "}
      </label>
      <div className="flex mt-8 w-full h-auto justify-center">
        <input
          type="text"
          id="searchBar"
          className="p-2 rounded-lg border-white border bg-gray-700 w-3/4 text-l text-white"
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

// container compoenent to display the results of user search query
const ResultContainer = ({ search_result }) => {
  return (
    <div className="h-auto w-full mt-6">
      <Food search_query={search_result} />
    </div>
  );
};

export default function FoodSearch() {
  // create useState for user search query
  const [searchResult, setSearchResult] = useState("");

  // set the search result
  const handleSearch = (query) => {
    setSearchResult(query);
  };

  return (
    /**
     * First render search bar and header and then the result container.
     *
     * The search bar will update the searchResult varaible with the most recent user query string, then we * * pass that string to ResultContainer via props.
     */

    // W-SCREEN CHANGES THE SIZE OF THE SIDE BAR
    <div className="flex flex-col items-center h-fit w-screen m-5">
      <SearchBarHeader onSearch={handleSearch} />

      {searchResult !== "" && <ResultContainer search_result={searchResult} />}
    </div>
  );
}
