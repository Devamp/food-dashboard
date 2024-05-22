"use client";
import { faAngleLeft, faHeartPulse } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSearchParams } from "next/navigation";
import { Chart, registerables } from "chart.js";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Sove "canvas already in use" issue
 *
 * Source: https://stackoverflow.com/questions/76532569/  im-having-problems-registering-the-category-scale-in-react-chart-js2/76536193
 */
Chart.register(...registerables);

const truncateDecimal = (num) => {
  const res = (Math.round(num * 100) / 100).toFixed(2);
  return res;
};

// Header compoenent which contains the food name and image
const Header = ({ servingSize, setServingSize }) => {
  const searchParams = useSearchParams();

  const foodName = searchParams.get("foodName");
  const foodImage = searchParams.get("foodImage");
  const foodWeight = searchParams.get("foodWeight");

  return (
    <div className="bg-slate-600 w-auto rounded-lg p-4 flex flex-col items-center ">
      <p className=" bg-slate-900 p-3 w-64 text-xl font-bold rounded-md text-center font-mono text-green-400">
        {foodName}
      </p>
      <img
        className="rounded-lg mt-2"
        src={foodImage || "/no-image.png"}
        style={{ width: "200px", height: "200px", objectFit: "cover" }}
      ></img>
      <ServingMenu
        servingSize={servingSize}
        setServingSize={setServingSize}
        servingWeight={foodWeight}
      />{" "}
      <Link
        href={"/food-search"}
        className="bg-green-400 px-3 py-2 rounded-lg hover:bg-green-500 mt-2 font-mono text-lg font-bold"
      >
        <FontAwesomeIcon
          icon={faAngleLeft}
          height={25}
          width={25}
          className="text-black"
        />
        Back
      </Link>
    </div>
  );
};

// componenet to build the serving size input field
const ServingMenu = ({ servingSize, setServingSize, servingWeight }) => {
  const handleInput = (event) => {
    setServingSize(event.target.value);
  };

  return (
    <div className="bg-slate-900 p-5 mt-3 rounded-md flex justify-center">
      <div className="w-fit text-center">
        <p className="mr-5 text-lg text-green-400 font-mono mb-2">
          Serving Size: {servingWeight}g
        </p>
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
          value={servingSize}
          onChange={handleInput}
          max={15}
          min={1}
        />
      </div>
    </div>
  );
};

// componenet to build and return the food macro pie chart
const MacroChart = ({ servingSize }) => {
  const searchParams = useSearchParams();
  let carbs, cals, fat, fiber, protein;

  carbs = searchParams.get("foodCarbs");
  cals = searchParams.get("foodCals");
  fiber = searchParams.get("foodFiber");
  fat = searchParams.get("foodFat");
  protein = searchParams.get("foodProtein");

  const nutrients = [
    carbs * servingSize,
    fiber * servingSize,
    fat * servingSize,
    protein * servingSize,
  ];

  const nutrientsNames = ["Carbs (g)", "Fiber (g)", "Fat (g)", "Protein (g)"];

  const colorPalette = [
    "rgba(129, 38, 255, 1)", // Dark Purple
    "rgba(245, 17, 17, 0.8)", // Red
    "rgba(60, 179, 113, 1)", // Green
    "rgba(255, 205, 86, 1)", // Yellow
    "rgba(54, 162, 235, 1)", // Blue
  ];

  // Pie chart data
  const chartData = {
    labels: nutrientsNames,
    datasets: [
      {
        data: nutrients,
        backgroundColor: colorPalette,
        borderColor: colorPalette,
        borderWidth: 1,
      },
    ],
  };

  // Pie chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "rgba(1, 1, 1, 1)",
          font: {
            size: 15,
          },
        },
      },
    },
  };

  return (
    <div className="ml-10">
      <p className="mb-5 bg-slate-900 p-5 mt-3 rounded-md text-center font-mono text-2xl font-bold text-green-400">
        <FontAwesomeIcon
          icon={faHeartPulse}
          height={25}
          width={25}
          color="gray"
          className="text-red-500 mr-3"
        />
        Nutritional Breakdown
      </p>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};

const MacroModules = ({ nutrient, value, units }) => {
  return (
    <div className="mb-1 bg-slate-900 shadow-lg shadow-black text-white font-mono p-5 rounded-lg text-center mt-5">
      <p>{nutrient}</p>
      <p className="text-green-400">{value + units}</p>
    </div>
  );
};

// componenet to display the food data- pie chart and macro modules
const DataContainer = ({ servingSize }) => {
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
  }, [servingSize, searchParams]);

  return (
    <div className="flex w-3/4 justify-center bg-orange">
      <div className="grid grid-cols-3 gap-5 gap-y-0">
        <MacroModules
          nutrient="Calories"
          value={truncateDecimal(cals * servingSize)}
          units={"kcal"}
        />
        <MacroModules
          nutrient="Protein"
          value={truncateDecimal(protein * servingSize)}
          units={"g"}
        />
        <MacroModules
          nutrient="Carbs"
          value={truncateDecimal(carbs * servingSize)}
          units={"g"}
        />
        <MacroModules
          nutrient="Fat"
          value={truncateDecimal(fat * servingSize)}
          units={"g"}
        />
        <MacroModules
          nutrient="Fiber"
          value={truncateDecimal(fiber * servingSize)}
          units={"g"}
        />
      </div>
    </div>
  );
};

const MoreInfo = () => {
  const [servingSize, setServingSize] = useState(1);

  return (
    <div className="flex flex-col items-center w-full h-screen bg-gray-100">
      <div className="flex justify-center items-center mt-5 mb-3">
        <Header servingSize={servingSize} setServingSize={setServingSize} />
        <MacroChart servingSize={servingSize} />
      </div>
      <DataContainer servingSize={servingSize} />
    </div>
  );
};

export default MoreInfo;
