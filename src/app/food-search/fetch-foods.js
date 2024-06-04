"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// will eventually find a way to hide this
const API_KEY = "7b67beb66e6846f7762cef4240bd3cd3";
const APP_ID = "3fae59b8";

// compoenent to display a card to show no matched results were found
const NotFoundCard = () => {
  return (
    <div className="flex justify-center items-center text-black font-mono text-xl border rounded-lg border-black font-bold text-cente p-3 mt-10 ">
      <p>
        <span className="text-red-500">Sorry!</span> Your search did not match
        any results.
      </p>
    </div>
  );
};

// compoenent to generate cards for each food item fetched from the api
const Card = ({ foodName, foodImage, foodID, foodNutrients, foodWeight }) => {
  let carbs, cals, fat, fiber, protein;
  carbs = foodNutrients["CHOCDF"];
  cals = foodNutrients["ENERC_KCAL"];
  fat = foodNutrients["FAT"];
  fiber = foodNutrients["FIBTG"];
  protein = foodNutrients["PROCNT"];

  let foodNameToUse = foodName;

  if (foodName.toString().length > 20) {
    foodNameToUse = foodName.toString().substring(0, 25) + "...";
  }

  return (
    <div className="bg-slate-700 shadow-lg shadow-black rounded-lg h-auto mb-5 p-3 items-center">
      <div className="flex items-center justify-center bg-white font-bold text-xl rounded text-center h-16 p-2">
        <p>{foodNameToUse}</p>
      </div>
      <div className="flex food-image mt-5 justify-center">
        <img
          className="rounded-lg"
          src={foodImage || "/no-image.png"}
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
        ></img>
      </div>
      <div className="view-button mt-2 p-3 text-white text-center">
        <Link
          href={{
            pathname: "/food-search/more-info",
            query: {
              foodID: foodID,
              foodName: foodNameToUse,
              foodImage: foodImage,
              foodWeight: foodWeight,
              foodCarbs: carbs,
              foodCals: cals,
              foodFat: fat,
              foodFiber: fiber,
              foodProtein: protein,
            },
          }}
        >
          <button className="bg-green-600 rounded px-6 py-2 shadow-black hover:bg-green-700 text-xl">
            <FontAwesomeIcon
              icon={faChartSimple}
              height={25}
              width={25}
              className="text-white mr-2"
            />
            Details
          </button>
        </Link>
      </div>
    </div>
  );
};

// Compoenent to hold the food cards
const CardContainer = ({ foodItem }) => {
  const [foodResults, setFoodResults] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch(
          "https://api.edamam.com/api/food-database/v2/parser?app_id=" +
            APP_ID +
            "&app_key=" +
            API_KEY +
            "&ingr=" +
            foodItem +
            "&nutrition-type=cooking"
        );
        const data = await res.json();
        setFoodResults(data);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };
    fetchFoods();
  }, [foodItem]);

  // if no results were returned, display error message
  if (
    Array.isArray(foodResults["hints"]) &&
    foodResults["hints"].length === 0
  ) {
    return (
      <div className="flex justify-center items-center">
        <NotFoundCard />
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center p-5 md:p-14">
        <div className="grid justify-center items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-5">
          {Array.isArray(foodResults["hints"]) &&
            foodResults["hints"].map((item, i) => (
              <Card
                key={i}
                foodName={item["food"]["label"]}
                foodImage={item["food"]["image"]}
                foodID={item["food"]["foodId"]}
                foodNutrients={item["food"]["nutrients"]}
                foodWeight={item["measures"][0]["weight"]}
              />
            ))}
        </div>
      </div>
    );
  }
};

// main compoenent to render the food search page
const Food = ({ search_query }) => {
  return (
    <div>
      <CardContainer foodItem={search_query} />
    </div>
  );
};

export default Food;
