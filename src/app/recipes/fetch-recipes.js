"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  faBook,
  faChartSimple,
  faClock,
  faEgg,
  faPepperHot,
  faReceipt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const truncateDecimal = (num) => {
  const res = (Math.round(num * 100) / 100).toFixed(0);
  return res;
};

const NutritionalModules = ({ color, name, value, units }) => {
  return (
    <div className={`rounded-lg p-2 mx-3 w-32 ${color}`}>
      <p className=" font-mono">{name}</p>
      <p>
        {value}
        {units}
      </p>
    </div>
  );
};
const RecipeCardBottomMenu = ({ cals, protein, fat, carbs, serves, url }) => {
  return (
    <div className=" rounded-lg h-1/2 mt-3 flex">
      <div className="nutrientsInfo w-2/3 flex  justify-center items-center">
        <NutritionalModules
          color={"bg-yellow-400"}
          name={"Calories"}
          value={truncateDecimal(cals)}
          units={" kcal"}
        />
        <NutritionalModules
          color={"bg-green-400"}
          name={"Protein"}
          value={truncateDecimal(protein)}
          units={"g"}
        />
        <NutritionalModules
          color={"bg-orange-400"}
          name={"Fat"}
          value={truncateDecimal(fat)}
          units={"g"}
        />
        <NutritionalModules
          color={"bg-red-400"}
          name={"Carbs"}
          value={truncateDecimal(carbs)}
          units={"g"}
        />
        <NutritionalModules
          color={"bg-white"}
          name={"Serves"}
          value={serves}
          units={""}
        />
      </div>

      <div className="buttonsMenu flex items-center justify-center ml-10">
        <button
          type="submit"
          id="submitButton"
          className="flex items-center text-white bg-green-700 px-2 py-1 text-lg rounded-lg hover:bg-green-600"
          onClick={() => window.open(url, "_blank")}
        >
          <div>
            <FontAwesomeIcon
              icon={faReceipt}
              height={20}
              width={20}
              color="white"
              className="mr-1"
            />
          </div>
          View Recipe
        </button>
      </div>
    </div>
  );
};

const RecipeCard = ({
  name,
  cals,
  protein,
  fat,
  carbs,
  img,
  serves,
  url,
  healthLabels,
}) => {
  return (
    <div className="bg-slate-900 flex flex-col rounded-lg w-full m-2 p-2">
      <div className="flex">
        <img
          src={img || "./no-image.png"}
          alt="This is a picture of a food item"
          className="rounded-xl shadow-md m-2 "
          style={{ width: "200px", height: "200px" }}
        />
        <div className=" text-center p-2 flex flex-col">
          <p className="text-white font-mono font-bold text-2xl">{name}</p>

          <div className="flex flex-wrap text-white m-5 justify-center items-center">
            {healthLabels.map((item, index) => (
              <span key={index} className="flex items-center">
                <p>{item}</p>
                {index < healthLabels.length - 1 && (
                  <span className="mx-2">•</span>
                )}
              </span>
            ))}
          </div>
          <RecipeCardBottomMenu
            cals={cals}
            protein={protein}
            fat={fat}
            carbs={carbs}
            serves={serves}
            url={url}
          />
        </div>
      </div>
    </div>
  );
};

const RecipeCardContainer = ({ searchQuery }) => {
  const [recipeResult, setRecipeResult] = useState([]);

  let url = `https://api.edamam.com/api/recipes/v2?type=any&q=${searchQuery.query}&app_id=${APP_ID}&app_key=${API_KEY}`;

  console.log(searchQuery);

  if (searchQuery.diet !== "") {
    url = url + `&diet=${searchQuery.diet}`;
  }

  if (searchQuery.cuisine !== "") {
    url = url + `&cuisine=${searchQuery.cuisine}`;
  }

  if (searchQuery.meal !== "") {
    url = url + `&meal=${searchQuery.meal}`;
  }

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setRecipeResult(data);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };
    fetchRecipes();
  }, [searchQuery]);

  return (
    <div className="flex flex-col justify-center items-center w-full ">
      {Array.isArray(recipeResult["hits"]) &&
        recipeResult["hits"].map((item, i) => (
          <RecipeCard
            key={i}
            cals={item["recipe"]["calories"]}
            name={item["recipe"]["label"]}
            fat={item["recipe"]["totalNutrients"]["FAT"]["quantity"]}
            carbs={item["recipe"]["totalNutrients"]["CHOCDF"]["quantity"]}
            protein={item["recipe"]["totalNutrients"]["PROCNT"]["quantity"]}
            img={item["recipe"]["image"]}
            serves={item["recipe"]["yield"]}
            url={item["recipe"]["url"]}
            healthLabels={item["recipe"]["healthLabels"]}
          />
        ))}
      ;
    </div>
  );
};

// main compoenent to render the food search page
const RecipeResults = ({ search_query }) => {
  return <RecipeCardContainer searchQuery={search_query} />;
};

export default RecipeResults;
