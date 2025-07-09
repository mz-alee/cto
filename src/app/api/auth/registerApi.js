import axiosInstance from "../axiosInstance";

export const RegisterPostApi = (data) => {
  return axiosInstance.post(`/signup/`, data);
};
export const verifyPostApi = (data) => {
  return axiosInstance.post(`/varifyotp/`, data);
};
