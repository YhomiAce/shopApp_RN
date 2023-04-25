import { AUTHENICATE, LOGOUT } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  isLoggedIn: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTHENICATE:
      return {
        ...state,
        token: payload.token,
        userId: payload.userId,
        isLoggedIn: true,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
