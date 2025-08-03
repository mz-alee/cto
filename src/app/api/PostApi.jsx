  "use client";
  import { getCookie, getCookies } from "cookies-next";
  import axiosInstance from "./axiosInstance";

  export const createPostApi = (data) => {
    return axiosInstance.post("/create_post/", data, {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
  };

  export const editPostApi = ({ id, data }) => {
    return axiosInstance.patch(`/create_post/${id}/`, data, {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
  };
  
  export const LikePostApi = (postId) => {
    return axiosInstance.post(
      `/like_post/`,
      { post: postId },
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
  };

  export const GetPostApi = () => {
    return axiosInstance.get("/dashboard/", {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
      withCredentials:true,
    });
  };
  export const ProfilePostApi = () => {
    return axiosInstance.get("/create_post/", {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
      withCredentials:true, 
    });
  };

  export const delPostApi = (id) => {
    return axiosInstance.delete(`/create_post/${id}/`, {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    });
  };

  export const ProfileGetData = () => {
    return axiosInstance.get("/main_profile/", {
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
      withCredentials: true,
    });
  };
