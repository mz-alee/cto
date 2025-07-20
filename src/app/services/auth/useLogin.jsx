"use client";
import { useRouter } from 'next/navigation';
import { LoginPostApi } from "../../api/auth/loginApi";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from 'react-toastify';

export const LoginMutation = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: (data) => LoginPostApi(data),
    onSuccess:()=>{
      router.push('/dashboard')
    },
    onError: (err) => {
      console.log("login api error", err?.response?.data?.error);
      toast.error(err?.response?.data?.error)
    },
  });
  <ToastContainer/>
};
