import React from "react";
import Loader from "../assets/loader.svg";

const LoadingModal = () => {
  return (
    <div className="loading-modal">
      <img src={Loader} alt="" width={200} />
    </div>
  );
};

export default LoadingModal;
