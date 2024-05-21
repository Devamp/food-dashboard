import React from "react";

const Article = ({ title, content }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-green-600">{title}</h2>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

export default Article;
