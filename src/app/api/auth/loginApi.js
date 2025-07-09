import axiosInstance from '../axiosInstance';

export const LoginPostApi = (data) => {
  return axiosInstance.post(`/login/`, data);
};
