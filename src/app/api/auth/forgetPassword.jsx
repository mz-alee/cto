import axiosInstance from "../axiosInstance";

export const forgetPostApi = (data) => {
  return axiosInstance.post(`/forgetpassword/`, data);
};
