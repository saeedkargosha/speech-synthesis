import { axiosInstance } from './axios-instance';

const getPosts = () =>
  axiosInstance({
    method: 'GET',
    url: '/posts',
  }).then((res) => res.data);

export const PostService = {
  getPosts,
};
