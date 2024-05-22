import {
  faAppleWhole,
  faBookOpen,
  faChartLine,
  faHandHoldingHeart,
  faHome,
  faLightbulb,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

// top div element which contains the app title
const AppTitleDiv = () => {
  return (
    <div className="flex flex-col">
      <Link
        href={"/"}
        className="mt-4 text-center text-3xl font-bold hover:scale-110 text-green-500 font-mono"
      >
        Food<span className="text-orange-500">IQ</span>
      </Link>
      <div className="bg-white h-1 w-52 mt-4"></div>
    </div>
  );
};

// function to create each route element on the side navigation bar
const PageRoute = ({ icon, route_name, route_path }) => {
  return (
    <div className="group">
      <div className="flex items-center mt-2 p-3 text-center group-hover:bg-slate-800">
        <FontAwesomeIcon
          icon={icon}
          height={21}
          width={21}
          color="gray"
          className="ml-4 group-hover:text-white"
        />
        <Link
          href={route_path}
          className="ml-3 text-l text-gray-400 group-hover:text-white group-hover:font-bold"
        >
          {route_name}{" "}
        </Link>
      </div>
    </div>
  );
};

// primary element which is the side navigation bar
const SideNavBar = () => {
  const routeInfo = [
    ["Home", faHome, "/"],
    ["Food Search", faAppleWhole, "/food-search"],
    ["Meal Tracking", faPenToSquare, "/meal-tracking"],
    ["Recipes", faBookOpen, "/recipes"],
    ["Nutritional Education", faLightbulb, "/learn-more"],
  ];

  return (
    <div className="flex flex-col bg-slate-900 min-h-screen w-screen sm:w-1/3 lg:w-1/4 xl:w-1/5 items-center">
      <AppTitleDiv />
      <div className="w-full mt-2">
        {routeInfo.map((routeInfo, index) => (
          <PageRoute
            key={index}
            route_name={routeInfo[0]}
            icon={routeInfo[1]}
            route_path={routeInfo[2]}
          />
        ))}
      </div>
      <div className="mt-auto w-full mb-3">
        <PageRoute
          route_name={"Attributions"}
          icon={faHandHoldingHeart}
          route_path={"/attributions"}
        />
      </div>
    </div>
  );
};

export default SideNavBar;
