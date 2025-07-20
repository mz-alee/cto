
import axiosInstance from './axiosInstance';

export interface CreatePostPayload {
  content: string;
  image?: File | string;
}

export interface PostResponse {
  id: number;
  content: string;
  image?: string;
  createdAt: string;
}

export const createPostApi = (data: CreatePostPayload) => {
  return axiosInstance.post<PostResponse>('/create_post/', data);
};
