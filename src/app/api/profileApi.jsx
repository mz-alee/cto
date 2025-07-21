"use client";
import { getCookie } from 'cookies-next';
import axiosInstance from "./axiosInstance";

// export const ProfileGetData = () => {
//   return axiosInstance.get("/main_profile/", {
//     headers: {
//       Authorization: `Bearer ${getCookie("token")}`,
//     },
//     withCredentials: true,
//   });
// };


export const ProfileEditApi = (data) => {
  // const id = mainData?.id;
  return axiosInstance.patch(`/edit_profile/${getCookie('user_id')}/`, data, {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
      "Content-Type" : "multipart/form-data"
    },
    withCredentials: true,
  });
};
