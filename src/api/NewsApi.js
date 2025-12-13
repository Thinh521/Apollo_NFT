import axiosInstance from './axiosInstance';

/**
 * Get all news
 */
export const getAllNewsApi = async ({page = 1, limit = 10}) => {
  try {
    const res = await axiosInstance.get('/api/news/get-all', {
      params: {
        page,
        limit,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Get activity request failed:', error);
    throw error.response?.data || {message: 'Get activity request failed'};
  }
};
/**
 * Get all owned news (user's news)
 */
export const getAllOwnedNewsApi = async ({page = 1}) => {
  try {
    const res = await axiosInstance.get('/api/news/get-owned-new', {
      params: {page},
    });

    return res.data;
  } catch (error) {
    console.error('Get owned news request failed:', error);
    throw error.response?.data || {message: 'Get owned news request failed'};
  }
};

/**
 * Create news
 */
export const createNewsApi = async formData => {
  try {
    const form = new FormData();

    if (formData.image) {
      form.append('image', {
        uri: formData.image.uri,
        type: formData.image.type || 'image/jpeg',
        name: formData.image.fileName || 'news.jpg',
      });
    }

    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('categoryId', formData.categoryId);
    form.append('content', formData.content);
    form.append('status', formData.status);

    const res = await axiosInstance.post('/api/news', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    console.error('Create news request failed:', error);
    throw error.response?.data || {message: 'Create news request failed'};
  }
};

/**
 * Update news
 * Only send fields that need update
 */
export const updateNewsApi = async formData => {
  try {
    if (!formData.id) {
      throw new Error('News ID is required');
    }

    const form = new FormData();
    form.append('id', formData.id);

    if (formData.image) {
      form.append('image', {
        uri: formData.image.uri,
        type: formData.image.type || 'image/jpeg',
        name: formData.image.fileName || 'news.jpg',
      });
    }

    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('categoryId', formData.categoryId);
    form.append('content', formData.content);
    form.append('status', formData.status);

    const res = await axiosInstance.put('/api/news', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    console.error('Update news request failed:', error);
    throw error.response?.data || {message: 'Update news request failed'};
  }
};

/**
 * Delete news
 */
export const deleteNewsApi = async newsId => {
  try {
    const res = await axiosInstance.delete(`/api/news/${newsId}`);

    return res.data;
  } catch (error) {
    console.error('Delete news request failed:', error);
    throw error.response?.data || {message: 'Delete news request failed'};
  }
};

/**
 * Publish news
 */
export const publishNewsApi = async newsId => {
  try {
    const res = await axiosInstance.put(`/api/news/published-new/${newsId}`);

    return res.data;
  } catch (error) {
    console.error('Publish news request failed:', error);
    throw error.response?.data || {message: 'Publish news request failed'};
  }
};

/**
 * Update view count
 */
export const updateNewsViewApi = async newsId => {
  try {
    const payload = {newsId: Number(newsId)};

    const res = await axiosInstance.put('/api/news/update-view', payload);

    return res.data;
  } catch (error) {
    console.error('ERR:', error);
  }
};
