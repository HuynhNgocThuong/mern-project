import { createContext, useReducer, useEffect } from 'react';

import axios from 'axios';
import { authReducer } from '../reducers/authReducer';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from '../constants/constants';
import setAuthToken from '../utils/setAuthtoken';

export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => loadUser(), []);

  const loadUser = async () => {
    // If access token is exist -> set default header of axios
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      // Every request will have accessToken - [Authorization: Bearer (Code)]
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }
    try {
      const response = await axios.get(`${apiUrl}/auth`);
      // console.log(response);
      if (response.data.success) {
        // [Redux] - Use dispath to reload authState
        dispatch({
          type: 'SET_AUTH',
          payload: {
            isAuthenticated: true,
            user: response.data.user,
          },
        });
      }
    } catch (error) {
      // If error -> remove accessToken at local storage and remove token of header request
      console.log(error);
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      // [Redux] - Use dispath to reload authState
      dispatch({
        type: 'SET_AUTH',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
      console.log(authState);
    }
  };

  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      // Check login is success and write access key into localStorage
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
        loadUser();
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else {
        return { succes: false, message: error.message };
      }
    }
  };

  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm);
      // Check login is success and write access key into localStorage
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
        loadUser();
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else {
        return { succes: false, message: error.message };
      }
    }
  };

  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: 'SET_AUTH',
      payload: { isAuthenticated: false, user: null },
    });
  };

  const authContextData = { loginUser, registerUser, logoutUser, authState };
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
