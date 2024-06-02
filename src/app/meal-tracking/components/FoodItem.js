"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// This component displays a food item with its name, image, and an "Add" button.
const FoodItem = ({ foodName, foodImage, onAdd }) => {
  return (
    <div className="bg-gray-700 shadow-lg rounded-lg h-auto mb-5 p-3 items-center text-white text-sm w-48 mx-auto">
      <div className="flex items-center justify-center font-bold text-center h-16 p-2">
        <p>{foodName}</p>
      </div>
      <div className="flex justify-center my-2">
        <img
          src={foodImage}
          alt={foodName}
          className="rounded-lg w-24 h-24 object-cover"
        />
      </div>
      <div className="flex justify-center mt-2">
        <button
          className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-500"
          onClick={onAdd} // Event handler for adding the food item
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add
        </button>
      </div>
    </div>
  );
};

export default FoodItem;
