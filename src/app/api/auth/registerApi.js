import axiosInstance from "../axiosInstance";

export const RegisterPostApi = (data) => {
  return axiosInstance.post(`/signup/`, data);
};
export const verifyPostApi = (data) => {
  return axiosInstance.post(`/varify_otp/`, data);
};
export const verifyResendOTP = (data) => {
  return axiosInstance.post(`/regenerate_otp/`, data);
};
