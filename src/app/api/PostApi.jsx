"use client";
import { getCookie } from "cookies-next";
import axiosInstance from "./axiosInstance";

export const createPostApi = (data) => {
  return axiosInstance.post("/create_post/", data, {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
export const GetPostApi = () => {
  return axiosInstance.get("/create_post/", {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
};
