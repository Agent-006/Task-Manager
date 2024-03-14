import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUpdatedTask: false,
  isLoggedIn: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, actions) => {
      state.isLoggedIn = true;
      state.userData = actions.payload.userData;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
    },

    setTrue: (state) => {
      state.isUpdatedTask = true;
    },

    setFalse: (state) => {
      state.isUpdatedTask = false;
    },
  },
});

export const { login, logout, setTrue, setFalse } = authSlice.actions;

export default authSlice.reducer;
