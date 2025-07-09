"use client";
import React, { useState } from "react";
// import InputField from "../components/InputField";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../schema/LoginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import ForgetEmailSection from "./forgetEmail";
import OTPSection from "./forgetOTP";
import NewPassword from "./newPassword";
import * as yup from "yup";
const forgetSchema = yup.object({
  email: yup.string().required("email is a required field"),
});
const ForgetPassword = () => {
  const [pageNum, setPageNum] = useState(1);
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgetSchema),
    defaultValues: {},
  });
  console.log(pageNum);

  return (
    <div
      style={{
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        // padding: '10px 6px',
        width: "100%",
      }}
    >
      {pageNum === 1 && (
        <ForgetEmailSection
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          setPageNum={setPageNum}
          pageNum={pageNum}
        />
      )}
      {pageNum === 2 && (
        <OTPSection
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          setPageNum={setPageNum}
          pageNum={pageNum}
        />
      )}
      {pageNum === 3 && (
        <NewPassword
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          setPageNum={setPageNum}
          pageNum={pageNum}
        />
      )}
    </div>
  );
};

export default ForgetPassword;
