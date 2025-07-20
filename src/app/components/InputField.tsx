import React from "react";
import { UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  register: UseFormRegister<any>; // You can replace `any` with your form schema type
  name: string;
  placeholder?: string;
  type?: string;
  values?: string;
}

const InputField: React.FC<InputFieldProps> = ({
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
        className="border border-gray-500 w-[300px] text-[12px] lg:text-[0.8vw] py-2 px-3 rounded outline-none text-gray-800"
      />
    </div>
  );
};

export default InputField;
