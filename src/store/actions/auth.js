import AsyncStorage from "@react-native-async-storage/async-storage";

const signUp_Url =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD7CK_3q0I1vP9o9XXpRpX3T1VGj0auIYU";
const login_Url =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD7CK_3q0I1vP9o9XXpRpX3T1VGj0auIYU";

// export const SIGNUP = "SIGNUP";
// export const LOGIN = "LOGIN";
export const AUTHENICATE = "AUTHENICATE";
export const LOGOUT = "LOGOUT";
let timer;

export const authenticate = (token, userId, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENICATE,
      payload: {
        token,
        userId,
      },
    });
  };
};

export const logout = () => {
  return async (dispatch) => {
    await clearStorage();
    clearLogoutTimer();
    dispatch({ type: LOGOUT });
  };
};

export const signup = (payload) => {
  return async (dispatch) => {
    try {
      const response = await fetch(signUp_Url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          returnSecureToken: true,
        }),
      });
      if (!response.ok) {
        const err = await response.json();
        const errorId = err.error.message;
        const message = formatError(errorId);
        throw new Error(message);
      }
      const data = await response.json();
      dispatch(
        authenticate(
          data.idToken,
          data.localId,
          parseInt(data.expiresIn) * 1000
        )
      );

      const expirationDate = new Date(
        new Date().getTime() + parseInt(data.expiresIn) * 1000
      );
      saveDataToStorage(data.idToken, data.localId, expirationDate);
    } catch (error) {
      throw error;
    }
  };
};

export const login = (payload) => {
  return async (dispatch) => {
    try {
      const response = await fetch(login_Url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
          returnSecureToken: true,
        }),
      });
      if (!response.ok) {
        const err = await response.json();
        const errorId = err.error.message;
        const message = formatError(errorId);
        throw new Error(message);
      }
      const data = await response.json();
      dispatch(
        authenticate(
          data.idToken,
          data.localId,
          parseInt(data.expiresIn) * 1000
        )
      );
      const expirationDate = new Date(
        new Date().getTime() + parseInt(data.expiresIn) * 1000
      );
      saveDataToStorage(data.idToken, data.localId, expirationDate);
    } catch (error) {
      throw error;
    }
  };
};

const formatError = (error) => {
  switch (error) {
    case "EMAIL_NOT_FOUND":
      return "Invalid Email";
    case "INVALID_PASSWORD":
      return "Unauthorized user";
    case "EMAIL_EXISTS":
      return "Email already exist";

    default:
      return "Something went wrong";
  }
};

const saveDataToStorage = async (token, userId, expiryDate) => {
  await AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiryDate: expiryDate.toISOString(),
    })
  );
};

const clearStorage = async () => {
  await AsyncStorage.removeItem("userData");
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};
