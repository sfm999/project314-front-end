import PropTypes from "prop-types";

import { useState, useReducer, useEffect, createContext } from "react";
import axios from "../utils/axios";
import { isValidToken, setSession } from "../utils/jwt";

const initialState = {
  isAuthenticated: true,
  isInitialized: false,
  userID: null,
  userFirstName: null,
  userLastName: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, userID } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      userID,
    };
  },
  LOGIN: (state, action) => {
    const { userID } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      userID,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        const userID = window.localStorage.getItem("userID");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken, userID);

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              userID: window.localStorage.getItem("userID"),
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              userID: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            userID: null,
          },
        });
      }
    };
    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post("/users/login/", {
      email,
      password,
    });

    const { accessToken, refreshToken, userID } = response.data;

    setSession(accessToken, userID);

    dispatch({
      type: "LOGIN",
      payload: {
        userID,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
