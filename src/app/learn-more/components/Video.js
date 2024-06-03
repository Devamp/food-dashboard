import React from "react";

//Video component whihc takes tile, url and intro as props
const Video = ({ title, url, intro }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-green-500 py-4">{title}</h2>
      {intro && <p className="text-black">{intro}</p>}
      <div className="relative w-full h-0" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={url}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default Video;
