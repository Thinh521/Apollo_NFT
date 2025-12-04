import axiosInstance from './axiosInstance';

export const getCurrentUserApi = async () => {
  try {
    const res = await axiosInstance.get('/api/user');

    console.log('user', res.data);

    return res.data;
  } catch (error) {
    console.error('get current user failed:', error);
    throw error.response?.data || {message: 'get current user failed'};
  }
};
