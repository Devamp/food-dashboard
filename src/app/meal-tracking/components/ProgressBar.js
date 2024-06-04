"use client";

import React from "react";

// Define the ProgressBar component, which accepts label, value, max, and color as props
const ProgressBar = ({ label, value, max, color }) => {
  const percentage = ((value / max) * 100).toFixed(2);
  const remaining = (max - value).toFixed(2);
  const roundedValue = value.toFixed(2);

  return (
    <div className="mb-4 p-3">
      <div className="flex justify-between mb-1">
        <span className="text-lg font-medium text-green-600">{label}</span>{" "}
        <span className="text-sm font-medium text-green-600">
          <span className="text-orange-500">{roundedValue} consumed</span>,{" "}
          {remaining} remaining
        </span>{" "}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-6 relative">
        {" "}
        <div
          className="h-6 rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
