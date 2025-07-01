import React, { useState } from "react";

const InputField = ({ register, name, placeholder, type, values }) => {
  // console.log("input data", values);

  return (
    <div className="w-full relative ">
      <input
        {...register(name)}
        defaultValue={values}
        type={type}
        placeholder={placeholder}
        className="border border-gray-300 w-full text-[12px] lg:text-[0.8vw]  py-2 px-3 rounded outline-none text-gray-600"
      />
    </div>
  );
};

export default InputField;
