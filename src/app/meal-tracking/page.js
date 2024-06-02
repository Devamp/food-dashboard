"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./components/SearchBar";
import FoodItem from "./components/FoodItem";
import ProgressBar from "./components/ProgressBar";

const truncateDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const MealTracking = () => {
  const [searchResult, setSearchResult] = useState(null); // State to store the search result
  const [foodItems, setFoodItems] = useState([]); // State to store the list of food items
  const [nutrients, setNutrients] = useState({
    // State to store the nutrient values
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

  const handleSearch = async (query) => {
    try {
      const res = await fetch(
        `https://api.edamam.com/api/food-database/v2/parser?app_id=3fae59b8&app_key=7b67beb66e6846f7762cef4240bd3cd3&ingr=${query}`
      );
      const data = await res.json();
      setSearchResult(data.hints[0]); // Always select the first item from the search results
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  const handleAddFoodItem = (food) => {
    setFoodItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.food.foodId === food.food.foodId
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.food.foodId === food.food.foodId
            ? { ...item, count: item.count + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...food, count: 1 }];
      }
    });

    const { ENERC_KCAL, CHOCDF, PROCNT, FAT } = food.food.nutrients; // Destructure nutrient values
    setNutrients((prevNutrients) => ({
      calories: Math.min(
        parseFloat(
          (
            prevNutrients.calories + parseFloat(truncateDecimal(ENERC_KCAL))
          ).toFixed(2)
        ),
        dailyGoals.calories
      ),
      carbs: Math.min(
        parseFloat(
          (prevNutrients.carbs + parseFloat(truncateDecimal(CHOCDF))).toFixed(2)
        ),
        dailyGoals.carbs
      ),
      proteins: Math.min(
        parseFloat(
          (
            prevNutrients.proteins + parseFloat(truncateDecimal(PROCNT))
          ).toFixed(2)
        ),
        dailyGoals.proteins
      ),
      fats: Math.min(
        parseFloat(
          (prevNutrients.fats + parseFloat(truncateDecimal(FAT))).toFixed(2)
        ),
        dailyGoals.fats
      ),
    }));

    setSearchResult(null); // Remove the food item from the search result
  };

  const handleRemoveFoodItem = (foodId) => {
    setFoodItems((prevItems) => {
      const itemToRemove = prevItems.find(
        (item) => item.food.foodId === foodId
      );
      if (!itemToRemove) return prevItems;
      if (itemToRemove.count > 1) {
        return prevItems.map((item) =>
          item.food.foodId === foodId
            ? { ...item, count: item.count - 1 }
            : item
        );
      } else {
        return prevItems.filter((item) => item.food.foodId !== foodId);
      }
    });

    const { ENERC_KCAL, CHOCDF, PROCNT, FAT } = foodItems.find(
      (item) => item.food.foodId === foodId
    ).food.nutrients;
    setNutrients((prevNutrients) => ({
      calories: Math.max(
        parseFloat(
          (
            prevNutrients.calories - parseFloat(truncateDecimal(ENERC_KCAL))
          ).toFixed(2)
        ),
        0
      ),
      carbs: Math.max(
        parseFloat(
          (prevNutrients.carbs - parseFloat(truncateDecimal(CHOCDF))).toFixed(2)
        ),
        0
      ),
      proteins: Math.max(
        parseFloat(
          (
            prevNutrients.proteins - parseFloat(truncateDecimal(PROCNT))
          ).toFixed(2)
        ),
        0
      ),
      fats: Math.max(
        parseFloat(
          (prevNutrients.fats - parseFloat(truncateDecimal(FAT))).toFixed(2)
        ),
        0
      ),
    }));
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="block text-3xl mb-4 font-bold text-green-600 pt-4 pl-28">
          TRACK YOUR DAILY CALORIES INTAKE TO MAINTAIN A HEALTHY LIFESTYLE.
        </h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="flex flex-wrap justify-start w-full max-w-6xl p-4">
        <div className="w-full md:w-1/2 p-2">
          <h2 className="pl-24 text-2xl font-bold mb-4 text-green-600">
            Searched Results
          </h2>
          <div className="pr-40 grid grid-cols-1 gap-4 mb-8">
            {searchResult && (
              <FoodItem
                foodName={searchResult.food.label}
                foodImage={searchResult.food.image}
                onAdd={() => handleAddFoodItem(searchResult)}
              />
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 p-2">
          <h2 className="text-2xl font-bold mb-1 text-green-600">
            Added Items
          </h2>
          <div className=" grid grid-cols-4 gap-4 mb-8">
            {foodItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-700 text-white p-3 rounded-lg flex justify-between items-center"
              >
                <span>
                  {item.food.label} {item.count > 1 && `(${item.count})`}
                </span>
                <button
                  onClick={() => handleRemoveFoodItem(item.food.foodId)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl pr-20">
        <h2 className=" text-2xl font-bold mb-4 text-green-600">
          Nutrient Progress
        </h2>
        <div className="mb-8 bg-slate-800 shadow-lg rounded-lg">
          <ProgressBar
            label="Calories"
            value={nutrients.calories}
            max={dailyGoals.calories}
            color="orange"
          />
          <ProgressBar
            label="Carbohydrates (g)"
            value={nutrients.carbs}
            max={dailyGoals.carbs}
            color="yellow"
          />
          <ProgressBar
            label="Proteins (g)"
            value={nutrients.proteins}
            max={dailyGoals.proteins}
            color="green"
          />
          <ProgressBar
            label="Fats (g)"
            value={nutrients.fats}
            max={dailyGoals.fats}
            color="red"
          />
        </div>
      </div>
    </div>
  );
};

export default MealTracking;
