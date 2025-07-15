"use client";
import { LoginPostApi } from "../../api/auth/loginApi";
import { useMutation } from "@tanstack/react-query";

export const LoginMutation = () => {
  return useMutation({
    mutationFn: (data) => LoginPostApi(data),
    onError: (err) => {
      console.log("login api error", err);
    },
  });
};
