import axiosInstance from "../axiosInstance";

export const forgetPostApi = (data) => {
  return axiosInstance.post(`/forgetpassword/`, data);
};

export const ResendOtp = (verifyData) => {
  return axiosInstance.post("/password_reset/", verifyData);
};
export const forgetVerifyPostData = (verifyData) => {
  return axiosInstance.post("/password_reset/validate_token/", verifyData);
};
export const forgetPostData = (forgetData) => {
  return axiosInstance.post("/password_reset/", forgetData);
};
export const resetUpdatePassword = (forgetData) => {
  return axiosInstance.post("/password_reset/confirm/", forgetData);
};
export const verifyResendOtp = (data) => {
  return axiosInstance.post("/regenerateotp/", data);
};
