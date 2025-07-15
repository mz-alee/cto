"use client";
import Loader from "../../components/Loader";
import OTP from "../../components/OTP";
import { otpSchema } from "../../schema/otpSchema";
import VerifyOtp from "../../services/auth/verifyOtp";
import VerifyResendOtp from "../../services/auth/verifyResendOtp";
import { yupResolver } from "@hookform/resolvers/yup";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const OTPSection = ({ setPageNum, pageNum }) => {
  const {
    setValue,
    control,
    getValues,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpSchema),
    mode: "onChange",
    defaultValues: {
      token: "",
    },
  });
  const router = useRouter();
  const verify = VerifyOtp();
  const handleData = (data) => {
    verify.mutate(data, {
      onSuccess: () => {
        router.push("/login");
        toast("user registered successfull");
      },
    });
    console.log("react hook form data");
  };
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const verifyresendOtp = VerifyResendOtp();
  const resendOtp = () => {
    verifyresendOtp.mutate({ email: getCookie("signupemail") });
  };
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);
  return (
    <div
      style={{
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        padding: "10px 10px",
        width: "100%",
      }}
      className="bg-hero bg-cover  flex items-center flex-col md:flex-row min-h-screen w-full"
    >
      <div className="h-[300px] md:h-full md:w-1/2  flex flex-col justify-center items-center">
        <h1 className="text-[20px] w-[280px] lg:text-4xl text-center md:w-[400px] font-[400] italic text-white/50 drop-shadow-sm">
          reset it to continue your journey with Conservation Through
          <span className="text-[#aa9322]"> Observation</span>
        </h1>
      </div>
      <div className="h-full md:w-1/2 flex justify-center items-center">
        <div className="bg-white/20 rounded-2xl  min-w-[320px] md:w-[450px] p-2 min-h-[240px]">
          <div className="w-full ">
            <h1 className="text-center mt-3 italic">
              Enter <span className="text-[#aa9322]">OTP</span>
            </h1>
          </div>
          <div className="flex flex-col justify-center min-h-[150px]     gap-4 items-center w-full  ">
            <form
              className="flex flex-col gap-6"
              onSubmit={handleSubmit(handleData)}
            >
              <div className="flex flex-col mt-4 gap-3">
                <OTP control={control} />
                {errors.token && (
                  <p className="error">{errors.token.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 ">
                <p className="text-[10px] lg:text-[0.8vw] text-center">
                  expired in : {timer}
                </p>
                <button
                  type="button"
                  onClick={resendOtp}
                  className="text-[12px] cursor-pointer w-full text-white lg:text-[0.9vw] bg-[#c0a521] rounded-2xl py-1 text-center"
                >
                  resend otp
                </button>
              </div>
              <div>
                <button className="mt-1 bg-[#c0a521] text-white hover:bg-transparent hover:text-[#c0a521] hover:border hover:border-[#c0a521] rounded-tl-4xl rounded-br-4xl cursor-pointer text-[12px] px-8 py-1 rounded-2xl shadow-lg transition-all duration-300">
                  {verify.isPending ? <Loader color="white" /> : "verify"}
                </button>
              </div>
            </form>
            <div className="flex items-center gap-1">
              <p className="text-[10px]">if you want to change the details</p>
              <button
                type="button"
                className="text-blue-800 cursor-pointer text-[12px] lg:text-[0.9vw]"
              >
                back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPSection;
