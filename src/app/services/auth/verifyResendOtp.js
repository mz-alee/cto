"use client";
import { verifyResendOTP } from '../../api/auth/registerApi';
import { useMutation } from "@tanstack/react-query";

const VerifyResendOtp = () => {
  return useMutation({
    mutationFn: (data) => verifyResendOTP(data),
  });
};

export default VerifyResendOtp;
