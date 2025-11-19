import { USER_LOGIN, USER_LOGOUT, USER_REGISTER } from '../Actions/ActionsTypes';

const initialState = {
  currentUser: null,
  isAuthenticated: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
    case USER_REGISTER:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true
      };
    case USER_LOGOUT:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default userReducer;