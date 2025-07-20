import axiosInstance from './axiosInstance';
export const ProfileGetData = () => {
  return axiosInstance.get("/mainprofile/", {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
    withCredentials: true,
  });
};
