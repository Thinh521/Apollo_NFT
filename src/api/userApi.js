import axiosInstance from './axiosInstance';

// Get current user
export const getCurrentUserApi = async () => {
  try {
    const res = await axiosInstance.get('/api/user');

    return res.data;
  } catch (error) {
    console.error('get current user failed:', error);
    throw error.response?.data || {message: 'get current user failed'};
  }
};

// Update user
export const updateUserApi = async ({userName, fullName, bio, avatar}) => {
  try {
    const formData = new FormData();

    if (userName) {
      formData.append('userName', userName);
    }
    if (fullName) {
      formData.append('fullName', fullName);
    }
    if (bio) {
      formData.append('bio', bio);
    }

    if (avatar) {
      formData.append('avatar', {
        uri: avatar.uri,
        type: avatar.type || 'image/jpeg',
        name: avatar.fileName || 'avatar.jpg',
      });
    }

    const res = await axiosInstance.put('/api/user', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    console.error('update user with avatar failed:', error);
    throw error.response?.data || {message: 'update user failed'};
  }
};

// Update user background/banner
export const updateUserBackgroundApi = async background => {
  try {
    if (!background) {
      throw new Error('Background image is required');
    }

    const formData = new FormData();
    formData.append('image', {
      uri: background.uri,
      type: background.type || 'image/jpeg',
      name: background.fileName || 'background.jpg',
    });

    const res = await axiosInstance.put(
      '/api/user/update-background',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return res.data;
  } catch (error) {
    console.error('update user background failed:', error);
    throw error.response?.data || {message: 'update user background failed'};
  }
};
