"use client";
import { RegisterPostApi, verifyPostApi } from "../../api/auth/registerApi";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";

const RegisterMutation = () => {
  return useMutation({
    mutationFn: (data) => RegisterPostApi(data),
    onSuccess: () => {
      toast("sign in successfully");
    },
    onError: (err) => {
      console.log("sign up api error", err);
      toast.error(err?.response?.data?.message);
    },
  });
  <>
    <ToastContainer />
  </>;
};

export default RegisterMutation;
