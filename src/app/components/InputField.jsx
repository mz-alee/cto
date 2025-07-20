import React from "react";

const InputField = ({
  register,
  name,
  placeholder = "",
  type = "text",
  values,
}) => {
  return (
    <div className="w-full relative">
      <input
        {...register(name)}
        defaultValue={values}
        type={type}
        placeholder={placeholder}
        className="border border-gray-500  w-full text-[12px] lg:text-[1vw] py-2 px-3 rounded outline-none text-gray-800"
      />
    </div>
  );
};

export default InputField;
