"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartPulse,
  faStar,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Chart, registerables } from "chart.js";
import { Doughnut } from "react-chartjs-2";

/**
 * Sove "canvas already in use" issue
 *
 * Source: https://stackoverflow.com/questions/76532569/  im-having-problems-registering-the-category-scale-in-react-chart-js2/76536193
 */
Chart.register(...registerables);

const RecipieHeader = () => {
  return (
    <div className="flex flex-col bg-slate-900 p-5 items-start justify-start rounded-2xl shadow-lg mx-10 w-fit mb-4">
      <div className="flex items-center">
        <div className="flex flex-col w-full">
          <div className="flex mb-10 xl:mb-15 2xl:mt-10">
            <FontAwesomeIcon
              icon={faStar}
              height={35}
              width={35}
              className="text-yellow-400 mr-1"
            />
            <FontAwesomeIcon
              icon={faStar}
              height={35}
              width={35}
              className="text-yellow-400 mr-1"
            />
            <FontAwesomeIcon
              icon={faStar}
              height={35}
              width={35}
              className="text-yellow-400 mr-1"
            />
            <FontAwesomeIcon
              icon={faStar}
              height={35}
              width={35}
              className="text-yellow-400 mr-1"
            />
            <FontAwesomeIcon
              icon={faStar}
              height={35}
              width={35}
              className="text-yellow-400 mr-1"
            />
          </div>
          <p className="text-left font-mono text-4xl xl:text-6xl 2xl:text-8xl font-bold text-green-400">
            All the <span className="text-orange-500">best</span> recipes in one
            place.
          </p>
          <div className="flex justify-start items-center bg-green-400 rounded-lg hover:bg-green-500 font-mono text-lg font-bold px-3 py-2 mt-8 w-fit xl:mt-12">
            <FontAwesomeIcon
              icon={faUtensils}
              height={25}
              width={25}
              className="text-black mr-2"
            />
            <Link href={"/recipes"}>Take me there</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 mx-3 w-4/5 xl:w-3/5 lg:grid-cols-2">
          <img
            src="/chicken.jpg"
            alt="This is a picture of a roasted chicken"
            className="rounded-xl bg-white shadow-md"
            style={{ width: "200px", height: "200px" }}
          />
          <img
            src="/sushi.jpg"
            alt="This is a picture of a sushi"
            className="rounded-xl bg-white shadow-md"
            style={{ width: "200px", height: "200px" }}
          />
          <img
            src="/lobster.webp"
            alt="This is a picture of a lobster"
            className="rounded-xl bg-white shadow-md"
            style={{ width: "200px", height: "200px" }}
          />
          <img
            src="/ramen.jpg"
            alt="This is a picture of a ramen"
            className="rounded-xl bg-white shadow-md"
            style={{ width: "200px", height: "200px" }}
          />
        </div>
      </div>
    </div>
  );
};

const GaugeChart = ({ value, nutrient, units, first }) => {
  // doughnut chart data
  const chartData = {
    datasets: [
      {
        data: [first, 50],
        backgroundColor: ["#F97316", "#0F172A"],
        borderColor: ["#F97316", "#0F172A"],
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  // doughnut chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "rgba(255, 255, 255, 1)",
          font: {
            size: 15,
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center bg-slate-800 rounded-lg px-5 my-2 lg:mx-2">
      <div className="flex flex-col w-32 h-32">
        <Doughnut data={chartData} options={chartOptions} />
      </div>
      <p className="text-green-400 text-xl font-mono  relative bottom-10 mt-2">
        {value}
        {units}
      </p>
      <p className="text-white  text-xl font-mono relative bottom-12 mt-2">
        {nutrient}
      </p>
    </div>
  );
};

const FoodDisplayHeader = () => {
  return (
    <div className="flex bg-slate-900 p-5 items-start justify-start rounded-2xl shadow-lg mx-10 w-fit mb-4">
      <div className="flex flex-col lg:flex-row items-center">
        <GaugeChart value={450} nutrient={"Calories"} units={""} first={30} />
        <GaugeChart value={64} nutrient={"Protein"} units={"g"} first={70} />
        <GaugeChart value={5} nutrient={"Carbs"} units={"g"} first={10} />
        <GaugeChart value={24} nutrient={"Fat"} units={"g"} first={150} />

        <div className="flex flex-col items-start ml-6">
          <p className="text-left font-mono text-2xl xl:text-4xl 2xl:text-6xl font-bold text-green-400">
            Gain <span className="text-orange-500">nutritional</span> insights.
          </p>
          <div className="flex items-center bg-green-400 rounded-lg hover:bg-green-500 font-mono text-lg font-bold px-3 py-2 mt-5 w-fit">
            <FontAwesomeIcon
              icon={faHeartPulse}
              height={25}
              width={25}
              className="text-black mr-2"
            />
            <Link href={"/food-search"}>Let's go</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col items-center w-screen mt-5">
      <RecipieHeader />
      <FoodDisplayHeader />
    </div>
  );
}
