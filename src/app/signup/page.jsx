"use client";
import React from "react";
import InputField from "../components/InputField";
import { SignupSchema } from "../schema/SignupSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import RegisterMutation from "../services/auth/useRegister";
const page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(SignupSchema),
    defaultValues: {},
  });
  const signup = RegisterMutation();
  const handleData = (data) => {
    signup.mutate(data);
    console.log("react hook form data");
  };
  return (
    <div
      style={{
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
      }}
      className="bg-hero bg-cover flex  flex-col md:flex-row min-h-screen w-full"
    >
      <div className="h-[500px] md:h-full md:w-1/2  flex flex-col justify-center items-center">
        <h1 className="text-[20px] w-[280px] lg:text-4xl text-center md:w-[400px] font-[400]  italic text-white/50 drop-shadow-sm">
          Welcome to Conservation Through Observation —{" "}
          <span className="text-[#aa9322]"> sign up</span> to begin your journey
        </h1>
      </div>
      <div className="h-full md:w-1/2 flex justify-center items-center">
        <div className="bg-white/20 rounded-2xl min-w-[320px] md:w-[450px] p-2 py-4 min-h-[470px]">
          <div className="w-full ">
            <h1 className="text-center mt-3 italic">
              sign <span className="text-[#aa9322]">up</span>
            </h1>
          </div>
          <form onSubmit={handleSubmit(handleData)}>
            <div className="flex flex-col justify-center gap-1 items-center w-full  ">
              <div>
                <p className="text-[12px] capitalize lg:text-[0.8vw]">
                  full name
                </p>
                <InputField
                  placeholder="full name"
                  type="text"
                  register={register}
                  name="fullname"
                />
                {errors.fullname && (
                  <p className="error">{errors.fullname.message}</p>
                )}
              </div>
              <div>
                <p className="text-[12px] capitalize lg:text-[0.8vw]">email</p>
                <InputField
                  placeholder="email"
                  type="text"
                  register={register}
                  name="email"
                />
                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
              </div>
              <div>
                <p className="text-[12px] capitalize lg:text-[0.8vw]">
                  phone number
                </p>
                <InputField
                  placeholder="phone number"
                  type="number"
                  register={register}
                  name="number"
                />
                {errors.number && (
                  <p className="error">{errors.number.message}</p>
                )}
              </div>
              <div>
                <p className="text-[12px] capitalize lg:text-[0.8vw]">
                  date of birth
                </p>
                <InputField
                  placeholder="phone number"
                  type="date"
                  register={register}
                  name="date_of_birth"
                />
                {errors.date_of_birth && (
                  <p className="error">{errors.date_of_birth.message}</p>
                )}
              </div>
              <div>
                <p className="text-[12px] capitalize lg:text-[0.8vw]">
                  password
                </p>
                <InputField
                  placeholder="password"
                  type="text"
                  register={register}
                  name="password"
                />
                {errors.password && (
                  <p className="error">{errors.password.message}</p>
                )}
              </div>
              <div>
                <p className="text-[12px] capitalize lg:text-[0.8vw]">
                  confirm password
                </p>
                <InputField
                  placeholder="confirm password"
                  type="text"
                  register={register}
                  name="confirmPassword"
                />
                {errors.confirmPassword && (
                  <p className="error">{errors.confirmPassword.message}</p>
                )}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <p className="text-[12px]">if you alreadt have an account?</p>
                  <button
                    type="button"
                    onClick={() => {
                      router.push("/login");
                    }}
                    className="text-blue-800 cursor-pointer text-12px lg:text-[0.9vw]"
                  >
                    login
                  </button>
                </div>
                <button className="mt-1 bg-[#c0a521] text-white hover:bg-transparent hover:text-[#c0a521] hover:border hover:border-[#c0a521] rounded-tl-4xl rounded-br-4xl cursor-pointer text-[12px] px-8 py-1 rounded-2xl shadow-lg transition-all duration-300">
                  sign up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
