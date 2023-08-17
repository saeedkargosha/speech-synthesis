import { axiosInstance } from './axios-instance';

/**
 * Fetch the content from the api
 */
const fetchContent = async (): Promise<{ content: string }> => {
  const res = await axiosInstance({
    method: 'GET',
    url: '/content',
  });
  return res.data;
};

export const SSMLService = {
  fetchContent,
};
