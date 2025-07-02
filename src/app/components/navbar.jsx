import React from "react";
import {  Dancing_Script, Poppins } from "next/font/google";
const logo = Dancing_Script({
  subsets: ["latin"],
  weight: ["400"],
});
const Navbar = () => {
  return (
    <nav
      data-aos-duration="1000"
      data-aos="fade-down"
      className="flex justify-between items-center px-6 py-4    top-0 z-50"
    >
      <h1 className={`${logo.className} text-[25px] text-[#c0a521] lg:text-[1.8vw] font-bold italic`}>
        Conservation App
      </h1>
      <div className="space-x-4">
        <button
          onClick={() => {
            router.push("/login");
          }}
          className="bg-transparent border border-gray-600 text-gray-600 hover:bg-white/10 hover:text-white px-4 py-1 rounded-tl-3xl rounded-br-3xl cursor-pointer rounded-lg font-medium transition-all"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
