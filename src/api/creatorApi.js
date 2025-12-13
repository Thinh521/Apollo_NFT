// api/creatorApi.js
import axiosInstance from './axiosInstance';

/**
 * Get all artists/creators ranking
 */
export const getAllArtistsApi = async ({
  timeRange,
  sortBy = 'all',
  page = 1,
  limit = 20,
} = {}) => {
  try {
    const res = await axiosInstance.get('/api/user/get-all-artist', {
      params: {
        timeRange: timeRange || undefined,
        sortBy,
        page,
        limit,
      },
    });

    const response = res.data.data || [];

    const pagination = response[0] || {};
    const artists = response.slice(1);

    return {
      data: artists,
      page: pagination.page ?? page,
      limit: pagination.limit ?? limit,
      total: pagination.total ?? 0,
      totalPages: pagination.totalPages ?? 1,
    };
  } catch (error) {
    console.error('Get all artists request failed:', error);
    throw error.response?.data || {message: 'Get all artists failed'};
  }
};
