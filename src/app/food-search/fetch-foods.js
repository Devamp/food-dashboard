import { useState, useEffect } from "react";
import Link from "next/link";

// will eventually find a way to hide this
const API_KEY = "7b67beb66e6846f7762cef4240bd3cd3";
const APP_ID = "3fae59b8";

// compoenent to display a card to show no matched results were found
const NotFoundCard = () => {
  return (
    <div className="flex justify-center items-center text-red-600 font-mono text-2xl border border-black rounded-lg font-bold text-cente p-2 mt-10">
      <p>Sorry! Your search query did not match any results.</p>
    </div>
  );
};

// compoenent to generate cards for each food item fetched from the api
const Card = ({ foodName, foodImage }) => {
  return (
    <div className="bg-slate-700 shadow-lg shadow-black rounded-lg h-auto mb-5 p-3 items-center">
      <div className="flex items-center justify-center bg-white font-bold text-xl rounded text-center h-16 p-2">
        <p>{foodName}</p>
      </div>
      <div className="flex food-image mt-5 justify-center">
        <img
          className="rounded-lg"
          src={foodImage || "/no-image.webp"}
          style={{ width: "200px", height: "200px" }}
        ></img>
      </div>
      <div className="view-button mt-2 p-3 text-white text-center">
        <Link href={"/food-search/more-info"}>
          <button className="bg-green-600 rounded px-6 py-2 shadow-black hover:bg-green-500 text-xl">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
};

// Compoenent to hold the countries cards
const CardContainer = ({ foodItem }) => {
  const [foodResults, setFoodResults] = useState([]);

  // useEffect to fetch countries data via API
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
  if (foodResults["hints"].length === 0) {
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
            foodResults["hints"].map((item) => (
              <Card
                foodName={item["food"]["label"]}
                foodImage={item["food"]["image"]}
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
