import React from "react";
import ReactPlayer from "react-player";
import "../index.css";

const ReactPlayerComponent = ({ url }) => {
  return (
    <div className="react-player-wrapper">
      <ReactPlayer url={url} controls={true} width="100%" height="100%" />
    </div>
  );
};

export default ReactPlayerComponent;
