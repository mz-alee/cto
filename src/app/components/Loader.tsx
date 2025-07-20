import React from "react";

interface LoaderProps {
  color?: "white" | "black" | "blue" | "red" | "green" | "gray" | string;
}

const Loader: React.FC<LoaderProps> = ({ color = "black" }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-4 h-4">
        <div
          className={`absolute inset-0 border-2 
            ${`border-t-${color}`} 
            border-b-transparent border-l-transparent border-r-transparent 
            rounded-full animate-spin`}
        ></div>
      </div>
    </div>
  );
};

export default Loader;
