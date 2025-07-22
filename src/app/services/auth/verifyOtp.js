"use client";
import { toast, ToastContainer } from "react-toastify";
import { verifyPostApi } from "../../api/auth/registerApi";
import { useMutation } from "@tanstack/react-query";

const VerifyOtp = () => {
  return useMutation({
    mutationFn: (data) => verifyPostApi(data),
    onSuccess: () => {
      toast("verify successfully");
    },
    onError: (err) => {
      console.log("verify api error", err);
      console.log("verify api error", err?.response?.data?.message);
      toast.error(err?.response?.data?.message);
    },
  });
};

export default VerifyOtp;
