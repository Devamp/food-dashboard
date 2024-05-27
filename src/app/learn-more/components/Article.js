import React from "react";

//Article component whihc takes tile, url and intro as props
const Article = ({ title, content, link }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-green-500">{title}</h2>
      <p className="text-gray-700">{content}</p>
      {link && (
        <a
          href={link}
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more
        </a>
      )}
    </div>
  );
};

export default Article;
