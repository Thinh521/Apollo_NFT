import axiosInstance from './axiosInstance';

/**
 * Get all collections
 */
export const getAllCollectionsApi = async () => {
  try {
    const res = await axiosInstance.get('/api/collection/get-all');

    return res.data;
  } catch (error) {
    console.error('Get all products request failed:', error);
    throw error.response?.data || {message: 'Get all products request failed'};
  }
};
