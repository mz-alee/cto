"use client";
import { verifyPostApi } from "../../api/auth/registerApi";
import { useMutation } from "@tanstack/react-query";

const VerifyOtp = () => {
  return useMutation({
    mutationFn: (data) => verifyPostApi(data),
  });
};

export default VerifyOtp;
