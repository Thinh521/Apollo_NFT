import {storage} from './mmkv';

// ===========================
// Token
export const saveToken = token => {
  storage.set('accessToken', token);
};

export const getToken = () => {
  return storage.getString('accessToken');
};

export const removeToken = () => {
  storage.delete('accessToken');
};

// ===========================
// User Data
export const saveUser = user => {
  storage.set('user', JSON.stringify(user));
};

export const getUser = () => {
  const data = storage.getString('user');
  return data ? JSON.parse(data) : null;
};

export const removeUser = () => {
  storage.delete('user');
};
