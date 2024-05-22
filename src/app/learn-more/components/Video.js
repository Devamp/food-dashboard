import React from "react";

const Video = ({ title, url }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-green-500">{title}</h2>
      {/* <div className="aspect-w-16 aspect-h-9"> */}
      <div className="relative w-96 h-96">
        <iframe
          src={url}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default Video;
