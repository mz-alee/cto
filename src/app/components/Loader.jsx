import React from "react";

const Loader = ({ color }) => {
  return (
    <div className="flex items-center justify-center ">
      <div className="relative w-4 h-4">
        <div
          className={`absolute inset-0 border-2 border-t-${color} border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin`}
        ></div>
      </div>
    </div>
  );
};

export default Loader;
