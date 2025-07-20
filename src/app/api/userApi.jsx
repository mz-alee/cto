import { getCookie } from "cookies-next";
import axiosInstance from "./axiosInstance";

export const AllUser = () => {
  return axiosInstance.get(`/all_users/`, {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
};
