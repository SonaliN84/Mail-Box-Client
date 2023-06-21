import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");
const initialEmail = localStorage.getItem("email");
const userIsLoggedIn = !!initialToken;
const initialAuthState = {
  token: initialToken,
  isLoggedIn: userIsLoggedIn,
  userEmail: initialEmail,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.userEmail = action.payload.email;
      console.log("email", action.payload.email);
      console.log("token", state.token);
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
    },
    logout(state) {
      state.token = null;
      state.userEmail = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
