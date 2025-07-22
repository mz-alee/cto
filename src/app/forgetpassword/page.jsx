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
import { useMutation } from "@tanstack/react-query";
import { forgetPostData } from "../api/auth/forgetPassword";
import { toast, ToastContainer } from "react-toastify";
const forgetSchema = yup.object({
  email: yup.string().required("email is a required field"),
});
const ForgetPassword = () => {
  const [pageNum, setPageNum] = useState(1);
  const [OTP, setOTP] = useState(null);

  const {
    register,
    control,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgetSchema),
    defaultValues: {},
  });
  console.log(pageNum);
  const value = getValues();
  const forgetMutation = useMutation({
    mutationFn: (forgetData) => forgetPostData(forgetData),
    onSuccess: () => {
      setPageNum(pageNum + 1);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err?.response?.data?.email?.[0]);
    },
  });
  const updateMutation = useMutation({
    mutationFn: (data) => resetUpdatePassword(data),
    onSuccess: (data) => {
      router.push("/Login");
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    forgetMutation.mutate(data);
    console.log(data);
  };
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
      <ToastContainer />
      {pageNum === 1 && (
        <ForgetEmailSection
          onSubmit={onSubmit}
          register={register}
          forgetMutation={forgetMutation}
          errors={errors}
          handleSubmit={handleSubmit}
          setPageNum={setPageNum}
          pageNum={pageNum}
        />
      )}
      {pageNum === 2 && (
        <OTPSection
          control={control}
          email={value.email}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          setOTP={setOTP}
          setPageNum={setPageNum}
          pageNum={pageNum}
        />
      )}
      {pageNum === 3 && (
        <NewPassword
          OTP={OTP}
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
