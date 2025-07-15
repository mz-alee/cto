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
  });
  <>
    <ToastContainer />
  </>;
};

export default RegisterMutation;
