"use client";

import React from "react";

const ProgressBar = ({ label, value, max }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-lg font-medium text-green-600">{label}</span>
        <span className="text-sm font-medium text-green-600">{`${value}/${max}`}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-6">
        <div
          className="bg-green-700 h-6 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
