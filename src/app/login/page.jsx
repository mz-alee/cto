"use client";
import React, { useEffect } from "react";
import InputField from "../components/InputField";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../schema/LoginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { LoginMutation, useLoginMutation } from "../services/auth/useLogin";
const Login = () => {
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {},
  });
  const login = LoginMutation();

  const handleData = (data) => {
    login.mutate(data);
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
        padding: '2px 10px'
      }}
      className="bg-hero bg-cover flex flex-col md:flex-row min-h-screen w-full"
    >
      <div className="h-[300px]  md:h-full md:w-1/2  flex flex-col justify-center items-center">
        <h1 className="text-[20px] w-[280px] lg:text-4xl text-center md:w-[400px] font-[400] italic text-white/50 drop-shadow-sm">
          Welcome to Conservation Through Observation —{" "}
          <span className="text-[#aa9322]"> Login</span> to begin your journey
        </h1>
      </div>
      <div className="h-full md:w-1/2 flex justify-center items-center">
        <div className="bg-white/30  rounded-2xl min-w-[300px] md:w-[450px] p-2 min-h-[240px]">
          <div className="w-full ">
            <h1 className="text-center mt-3 italic">
              Log<span className="text-[#aa9322]">in</span>
            </h1>
          </div>
          <div className="flex flex-col justify-center gap-2 items-center w-full  ">
            <form onSubmit={handleSubmit(handleData)}>
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
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1">
                    <p className="text-[10px]">if you dont have an account?</p>
                    <button
                      type="button"
                      onClick={() => {
                        router.push("/signup");
                      }}
                      className="text-blue-800 cursor-pointer text-[10px] lg:text-[0.9vw]"
                    >
                      signup
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      router.push("/forgetpassword");
                    }}
                    className="underline cursor-pointer text-[8px] lg:text-[0.7vw]"
                  >
                    forget password
                  </button>
                </div>
                <button className="mt-1 bg-[#c0a521] text-white hover:bg-transparent hover:text-[#c0a521] hover:border hover:border-[#c0a521] rounded-tl-4xl rounded-br-4xl cursor-pointer text-[12px] px-8 py-1 rounded-2xl shadow-lg transition-all duration-300">
                  login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
