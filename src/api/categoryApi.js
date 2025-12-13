import axiosInstance from './axiosInstance';

/**
 * Get all categories by type
 * @param {string} type - 'news' | 'events'
 */
export const getAllCategoryApi = async (type = 'news') => {
  try {
    const res = await axiosInstance.get('/api/category-new/get-all', {
      params: {
        type,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Get all category request failed:', error);
    throw error.response?.data || {message: 'Get all category failed'};
  }
};
