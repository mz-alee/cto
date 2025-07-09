"use client";
import { RegisterPostApi } from "@/app/api/auth/registerApi";
import { useMutation } from "@tanstack/react-query";

const RegisterMutation = () => {
  return useMutation({
    mutationFn: (data) => RegisterPostApi(data),
  });
};

export default RegisterMutation;
