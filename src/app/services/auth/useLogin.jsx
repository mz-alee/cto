"use client";
import { useRouter } from "next/navigation";
import { LoginPostApi } from "../../api/auth/loginApi";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { setCookie } from "cookies-next";

export const LoginMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data) => LoginPostApi(data),
    onSuccess: (data) => {
      console.log(data.data);
      setCookie("token", data?.data?.access_token);
      setCookie("user_id", data.data.id);
      router.push("/dashboard");
    },
    onError: (err) => {
      console.log("login api error", err);
      toast.error(err?.response?.data?.message);
    },
  });
  <ToastContainer />;
};
