"use client";

import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import FoodItem from "./components/FoodItem";
import ProgressBar from "./components/ProgressBar";

const truncateDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// MealTracking component for the entire page
const MealTracking = () => {
  const [searchResult, setSearchResult] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [nutrients, setNutrients] = useState({
    calories: 0,
    carbs: 0,
    proteins: 0,
    fats: 0,
  });

  // Dummy values for nutrient daily goals
  const dailyGoals = {
    calories: 2000,
    carbs: 300,
    proteins: 50,
    fats: 70,
  };

  const handleSearch = (query) => {
    // Set the search result directly as the user's search query
    setSearchResult(query);
  };

  const handleAddFoodItem = () => {
    // Assuming that you will replace this with a call to an API that fetches the nutrients for the searched food
    const foodNutrients = {
      ENERC_KCAL: 100, // Example value for calories
      CHOCDF: 20, // Example value for carbs
      PROCNT: 10, // Example value for proteins
      FAT: 5, // Example value for fats
    };

    setFoodItems((prevItems) => [...prevItems, searchResult]);

    const { ENERC_KCAL, CHOCDF, PROCNT, FAT } = foodNutrients;
    setNutrients((prevNutrients) => ({
      calories:
        parseFloat(prevNutrients.calories) +
        parseFloat(truncateDecimal(ENERC_KCAL)),
      carbs:
        parseFloat(prevNutrients.carbs) + parseFloat(truncateDecimal(CHOCDF)),
      proteins:
        parseFloat(prevNutrients.proteins) +
        parseFloat(truncateDecimal(PROCNT)),
      fats: parseFloat(prevNutrients.fats) + parseFloat(truncateDecimal(FAT)),
    }));

    // Clear the search result after adding the food item
    setSearchResult("");
  };

  return (
    <div className="flex flex-col items-center w-full h-screen bg-gray-100">
      {/* <h1 className="text-4xl font-bold text-center mb-10 text-green-500">
        Meal Tracking
      </h1> */}
      <SearchBar onSearch={handleSearch} />
      <div className="w-full max-w-4xl p-4">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          Searched Food Items
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {searchResult && (
            <FoodItem foodName={searchResult} onClick={handleAddFoodItem} />
          )}
        </div>
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          Nutrient Progress
        </h2>
        <div className="mb-8">
          <ProgressBar
            label="Calories"
            value={nutrients.calories}
            max={dailyGoals.calories}
          />
          <ProgressBar
            label="Carbohydrates (g)"
            value={nutrients.carbs}
            max={dailyGoals.carbs}
          />
          <ProgressBar
            label="Proteins (g)"
            value={nutrients.proteins}
            max={dailyGoals.proteins}
          />
          <ProgressBar
            label="Fats (g)"
            value={nutrients.fats}
            max={dailyGoals.fats}
          />
        </div>
      </div>
    </div>
  );
};

export default MealTracking;
