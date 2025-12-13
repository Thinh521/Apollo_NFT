import axiosInstance from './axiosInstance';

/**
 * Get one product detail
 */
export const getOneProductApi = async ({
  productId,
  listingId = null,
  auctionId = null,
  addressWallet = null,
}) => {
  try {
    const res = await axiosInstance.get('/api/product/get-one', {
      params: {
        productId,
        listingId: listingId || undefined,
        auctionId: auctionId || undefined,
        addressWallet: addressWallet || undefined,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Get one product request failed:', error);
    throw error.response?.data || {message: 'Get one product request failed'};
  }
};

/**
 * Get all NFT products
 */
export const getAllProductsApi = async ({
  addressWallet,
  page = 1,
  limit = 10,
}) => {
  try {
    const res = await axiosInstance.get('/api/product/get-all', {
      params: {
        addressWallet: addressWallet || undefined,
        page,
        limit,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Get all products request failed:', error);
    throw error.response?.data || {message: 'Get all products request failed'};
  }
};

/**
 * Get all NFT products by user
 */
export const getAllOwnedProductsApi = async ({page = 1, limit = 10}) => {
  try {
    const res = await axiosInstance.get('/api/product/get-all-owned', {
      params: {
        page,
        limit,
      },
    });

    return res.data;
  } catch (error) {
    console.error('Get all products request failed:', error);
    throw error.response?.data || {message: 'Get all products request failed'};
  }
};

/**
 * Get product activity by product
 */
export const getProductActivityApi = async productId => {
  try {
    const res = await axiosInstance.get(`/api/activity/get-all/${productId}`);

    return res.data;
  } catch (error) {
    console.error('Get all products request failed:', error);
    throw error.response?.data || {message: 'Get all products request failed'};
  }
};

/**
 * Create product NFT
 */
export const createProductApi = async formData => {
  try {
    const form = new FormData();

    if (formData.image) {
      form.append('image', {
        uri: formData.image.uri,
        type: formData.image.type || 'image/jpeg',
        name: formData.image.fileName || 'upload.jpg',
      });
    }

    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('externalLink', formData.externalLink || '');
    form.append('supply', formData.supply);
    form.append('blockchain', formData.blockchain);

    if (typeof formData.price === 'number') {
      form.append('price', String(formData.price));
    }

    if (typeof formData.isFreeze === 'boolean') {
      form.append('isFreeze', String(formData.isFreeze));
    }

    if (formData.properties && formData.properties.length > 0) {
      formData.properties.forEach((prop, index) => {
        form.append(`properties[${index}][type]`, prop.type);
        form.append(`properties[${index}][name]`, prop.name);
      });
    }

    const res = await axiosInstance.post('/api/product', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    console.error('Create product request failed:', error);
    throw error.response?.data || {message: 'Create product request failed'};
  }
};

/**
 * Update Product NFT
 */
export const updateProductApi = async formData => {
  try {
    if (!formData.id) {
      throw new Error('Product ID is required');
    }

    const form = new FormData();

    if (formData.image) {
      form.append('image', {
        uri: formData.image.uri,
        type: formData.image.type || 'image/jpeg',
        name: formData.image.fileName || 'upload.jpg',
      });
    }

    form.append('id', formData.id);
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('externalLink', formData.externalLink || '');
    form.append('supply', formData.supply);
    form.append('blockchain', formData.blockchain);

    if (typeof formData.price === 'number') {
      form.append('price', String(formData.price));
    }

    if (typeof formData.isFreeze === 'boolean') {
      form.append('isFreeze', String(formData.isFreeze));
    }

    if (formData.properties && formData.properties.length > 0) {
      formData.properties.forEach((prop, index) => {
        form.append(`properties[${index}][type]`, prop.type);
        form.append(`properties[${index}][name]`, prop.name);
      });
    }

    const res = await axiosInstance.put('/api/product', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (error) {
    console.error('Update product request failed:', error);
    throw error.response?.data || {message: 'Update product request failed'};
  }
};
