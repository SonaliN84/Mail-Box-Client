import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");
const initialEmail = localStorage.getItem("email");
const userIsLoggedIn = !!initialToken;
const initialUserId = localStorage.getItem("userid");
const initialAuthState = {
  token: initialToken,
  isLoggedIn: userIsLoggedIn,
  userEmail: initialEmail,
  userId: initialUserId,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.userEmail = action.payload.email;
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.token = null;
      state.userEmail = null;
      state.isLoggedIn = false;
      state.userId = null;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
