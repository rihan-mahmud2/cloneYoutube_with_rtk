import React from "react";

const Player = ({ thumbnail, title }) => {
  return (
    <iframe
      width="100%"
      className="aspect-video"
      src={thumbnail}
      title={title}
      frameBorder=""
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  );
};

export default Player;
