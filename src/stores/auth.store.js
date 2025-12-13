import {create} from 'zustand';
import {
  getToken,
  getUser,
  removeToken,
  removeUser,
  saveToken,
  saveUser,
} from '../storage/authStorage';

export const useAuthStore = create(set => ({
  token: getToken() || null,
  user: getUser() || null,

  setToken: token => {
    saveToken(token);
    set({token});
  },

  setUser: user => {
    saveUser(user);
    set({user});
  },

  clearAuth: () => {
    removeToken();
    removeUser();
    set({token: null, user: null});
  },
}));
