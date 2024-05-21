"use client";
import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { useSearchParams } from "next/navigation";

let servingSizeSelected = 1;

const truncateDecimal = (num) => {
  const res = (Math.round(num * 100) / 100).toFixed(2);
  return res;
};

// Header compoenent which contains the food name and image
const Header = () => {
  const searchParams = useSearchParams();

  const foodName = searchParams.get("foodName");
  const foodImage = searchParams.get("foodImage");

  return (
    <div className="bg-slate-600 w-fit rounded-lg p-5 mt-8 flex flex-col items-center ">
      <p className="text-xl font-bold text-white font-mono text-center">
        {foodName}
      </p>
      <img
        className="rounded-lg mt-5"
        src={foodImage || "/no-image.webp"}
        style={{ width: "300px", height: "250px" }}
      ></img>
      <ServingMenu />
    </div>
  );
};

// componenet to build the serving size input field
const ServingMenu = () => {
  const [servingSize, setServingSize] = useState(1);

  const handleInput = (inputElement) => {
    setServingSize(inputElement.target.value);
    servingSizeSelected = servingSize;
  };

  return (
    <div className="bg-slate-900 p-5 mt-5 rounded-md flex justify-center">
      <div className="w-fit">
        <label
          for="servingInput"
          className="mr-5 text-lg text-green-400 font-mono"
        >
          Number of Servings:
        </label>
        <input
          id="servingInput"
          type="number"
          className="rounded-lg p-1 text-xl w-14 text-center"
          defaultValue={1}
          onChange={handleInput}
        />
      </div>
    </div>
  );
};

// componenet to build and return the food macro pie chart
const MacroChart = () => {
  return (
    <div className="w-fit  mr-10">
      <img
        className="rounded-lg mt-5"
        src={"/no-image.webp"}
        style={{ width: "400px", height: "400px" }}
      ></img>
    </div>
  );
};

const MacroModules = ({ nutrient, value, units }) => {
  return (
    <div className="mb-4 bg-slate-900 shadow-lg shadow-black text-white font-mono p-5 rounded-lg text-center w-34">
      <p>{nutrient}</p>
      <p className="text-green-400">{value + units}</p>
    </div>
  );
};

// componenet to display the food data- pie chart and macro modules
const DataContainer = () => {
  const searchParams = useSearchParams();
  let carbs, cals, fat, fiber, protein;

  const foodID = searchParams.get("foodID");
  carbs = searchParams.get("foodCarbs");
  cals = searchParams.get("foodCals");
  fiber = searchParams.get("foodFiber");
  fat = searchParams.get("foodFat");
  protein = searchParams.get("foodProtein");

  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    const fetchNutrients = async () => {
      const response = await fetch(
        "https://api.edamam.com/api/food-database/v2/nutrients?app_id=3fae59b8&app_key=7b67beb66e6846f7762cef4240bd3cd3",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ingredients: [
              {
                quantity: servingSizeSelected,
                measureURI:
                  "http://www.edamam.com/ontologies/edamam.owl#Measure_serving",
                foodId: foodID,
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFoodData(data);
      } else {
        console.error("Failed to fetch nutrients:", response.statusText);
      }
    };

    //fetchNutrients();
  }, []);

  return (
    <div className=" rounded-lg flex mt-5 w-3/4 justify-center">
      <MacroChart />

      <div className="flex space-x-6 items-center w-fit">
        <div className="grid grid-cols-3 gap-5 ">
          <MacroModules
            nutrient="Calories"
            value={truncateDecimal(cals)}
            units={"kcal"}
          />
          <MacroModules
            nutrient="Protein"
            value={truncateDecimal(protein)}
            units={"g"}
          />
          <MacroModules
            nutrient="Carbs"
            value={truncateDecimal(carbs)}
            units={"g"}
          />
          <MacroModules
            nutrient="Fat"
            value={truncateDecimal(fat)}
            units={"g"}
          />
          <MacroModules
            nutrient="Fiber"
            value={truncateDecimal(fiber)}
            units={"g"}
          />
          <MacroModules nutrient="Sugar" value={"TODO"} units={""} />
        </div>
      </div>
    </div>
  );
};

const MoreInfo = () => {
  return (
    <div className="flex flex-col items-center w-full h-screen bg-gray-300">
      <Header />
      <DataContainer />
    </div>
  );
};

export default MoreInfo;
