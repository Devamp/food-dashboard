"use client";

import React from "react";

const FoodItem = ({ foodName, onClick }) => {
  return (
    <div
      className="bg-slate-700 shadow-lg rounded-lg h-auto mb-5 p-3 items-center cursor-pointer text-white"
      onClick={onClick}
    >
      <p className="font-bold">{foodName}</p>
    </div>
  );
};

export default FoodItem;
