"use client";
import {
  faBowlFood,
  faSearch,
  faSun,
  faWeightScale,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RecipeResults from "./fetch-recipes";
import { useState } from "react";

const FilterBar = ({ setCuisine, setDiet, setMeal }) => {
  return (
    <div className="filterBar flex mt-5 w-full justify-center">
      <div className="text-center">
        <label for="cuisine" className="font-mono text-white mr-1">
          <FontAwesomeIcon
            icon={faBowlFood}
            height={20}
            width={20}
            color="white"
            className="mr-1"
          />
          Cuisine Type:
        </label>

        <select
          data-testid="cuisine-dropdown"
          id="cuisine"
          className="p-2 w-30 rounded-xl"
          onChange={(e) => setCuisine(e.target.value)}
        >
          <option value="" selected>
            Any
          </option>
          <option value="american">American</option>
          <option value="asian">Asian</option>
          <option value="british">British</option>
          <option value="caribbean">Caribbean</option>
          <option value="central-europe">Central Europe</option>
          <option value="chinese">Chinese</option>
          <option value="eastern-europe">Eastern Europe</option>
          <option value="french">French</option>
          <option value="greek">Greek</option>
          <option value="indian">Indian</option>
          <option value="italian">Italian</option>
          <option value="japanese">Japanese</option>
          <option value="korean">Korean</option>
          <option value="kosher">Kosher</option>
          <option value="mediterranean">Mediterranean</option>
          <option value="mexican">Mexican</option>
          <option value="middle-eastern">Middle Eastern</option>
          <option value="nordic">Nordic</option>
          <option value="south-american">South American</option>
          <option value="south-east-asian">South East Asian</option>
          <option value="world">World</option>
        </select>
      </div>

      <div className="text-center mx-5 ">
        <label for="diet" className="font-mono text-white mr-1">
          <FontAwesomeIcon
            icon={faWeightScale}
            height={20}
            width={20}
            color="white"
            className="mr-1"
          />
          Diet Type:
        </label>

        <select
          data-testid="diet-dropdown"
          id="diet"
          className="px-3 py-2 rounded-xl w-30"
          onChange={(e) => setDiet(e.target.value)}
        >
          <option value="" selected>
            Any
          </option>
          <option value="balanced">Balanced</option>
          <option value="high-fiber">High-fiber</option>
          <option value="high-protein">High-protein</option>
          <option value="low-carb">Low-carb</option>
          <option value="low-fat">Low-fat</option>
        </select>
      </div>

      <div className="text-center mx-5 ">
        <label for="meal" className="font-mono text-white mr-1">
          <FontAwesomeIcon
            icon={faSun}
            height={20}
            width={20}
            color="white"
            className="mr-1"
          />
          Meal Type:
        </label>

        <select
          data-testid="meal-dropdown"
          id="meal"
          className="px-3 py-2 rounded-xl w-28"
          onChange={(e) => setMeal(e.target.value)}
        >
          <option value="" selected>
            Any
          </option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="teatime">Teatime</option>
          <option value="snack">Snack</option>
        </select>
      </div>
    </div>
  );
};

const Header = ({ onSearchSet }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [cuisine, setCuisine] = useState("");
  const [meal, setMeal] = useState("");
  const [diet, setDiet] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query.target.value);
  };

  const handleSubmit = () => {
    onSearchSet(searchQuery, cuisine, diet, meal);
  };
  return (
    <div className=" flex flex-col items-center mt-5">
      <div className="flex flex-col bg-slate-900 p-5 items-center rounded-2xl shadow-lg mx-10 w-full mb-4">
        <label
          for="searchBar"
          className=" text-green-400 font-bold font-mono text-4xl"
          data-testid="recipe-header-lookup-text"
        >
          DELICIOUS RECIPES TAILORED JUST FOR YOU.
        </label>
        <div className="flex mt-8 w-full h-auto justify-center">
          <input
            type="text"
            id="searchBar"
            className="p-2 rounded-lg focus:outline-black bg-gray-700 w-3/4 text-l text-white border-white border"
            placeholder="Search for delicious recipes..."
            required
            onChange={handleSearch}
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

        <FilterBar
          setCuisine={setCuisine}
          setDiet={setDiet}
          setMeal={setMeal}
        />
      </div>
    </div>
  );
};

const ResultContainer = ({ searchQuery }) => {
  return (
    <div className="flex flex-col  items-center">
      <RecipeResults search_query={searchQuery} />
    </div>
  );
};
export default function Recipes() {
  // create useState for user search query
  const [searchResult, setSearchResult] = useState("");

  const handleSearch = (query, cuisine, diet, meal) => {
    setSearchResult({ query, cuisine, diet, meal });
  };

  return (
    <div className="flex flex-col items-center w-screen mx-5">
      <Header onSearchSet={handleSearch} />
      <ResultContainer searchQuery={searchResult} />
    </div>
  );
}
