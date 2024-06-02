import React from "react";

// Article component which takes title, content, link, and image as props
const Article = ({ title, content, link, image }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover rounded-t-xl"
        />
      )}
      <h2 className="text-2xl font-bold text-green-500">{title}</h2>
      <p className="text-black">{content}</p>
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
