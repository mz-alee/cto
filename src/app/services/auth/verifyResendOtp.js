"use client";
import { toast, ToastContainer } from "react-toastify";
import { verifyResendOTP } from "../../api/auth/registerApi";
import { useMutation } from "@tanstack/react-query";

const VerifyResendOtp = () => {
  return useMutation({
    mutationFn: (data) => verifyResendOTP(data),
    onSuccess: () => {
      toast("OTP  Resend Successfully");
    },
    onError: (err) => {
      console.log(err);
    },
  });
  <ToastContainer />;
};

export default VerifyResendOtp;
