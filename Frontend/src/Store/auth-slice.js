import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");
const initialEmail = localStorage.getItem("email");
const userIsLoggedIn = !!initialToken;
const initialUserId=localStorage.getItem("userid")
const initialAuthState = {
  token: initialToken,
  isLoggedIn: userIsLoggedIn,
  userEmail: initialEmail,
  userId:initialUserId
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.userEmail = action.payload.email;
      state.userId=action.payload.userId;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("userid",action.payload.userId)
    },
    logout(state) {
      state.token = null;
      state.userEmail = null;
      state.isLoggedIn = false;
      state.userId=null;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("userid");
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
