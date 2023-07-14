import React from "react";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader-text">Loading...</div>
      <div className="loader-bars">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;