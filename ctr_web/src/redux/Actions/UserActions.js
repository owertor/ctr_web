import { USER_LOGIN, USER_LOGOUT, USER_REGISTER } from './ActionsTypes';

export const loginUser = (user) => ({
  type: USER_LOGIN,
  payload: user
});

export const logoutUser = () => ({
  type: USER_LOGOUT
});

export const registerUser = (user) => ({
  type: USER_REGISTER,
  payload: user
});