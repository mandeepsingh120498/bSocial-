import { createSlice } from "@reduxjs/toolkit";
import { signInUser, signUpUser, logoutUser } from "./authAction";
import { AuthState } from "./types";
import { RootState } from "../../app/store";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  isSignInError: null,
  isSignUpError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:  {
    resetAuthError: (state) => {
      state.isSignInError = null;
      state.isSignUpError = null;
    },
    resetUserState: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.isSignInError = null;
      state.isSignUpError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.isSignUpError = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.isSignUpError = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.isSignUpError = action.payload as string;
      })
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.isSignInError = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.user = { email: action.payload.email || '', username: action.payload.username, uid: action.payload.firebase_uid, id: action.payload.id, refreshToken: action.payload.refreshToken, accessToken: action.payload.accessToken };
        state.isAuthenticated = true;
        state.loading = false;
        state.isSignInError = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.isSignInError = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isSignInError = null;
        state.isSignUpError = null;
      });
  },
});
export const { resetAuthError, resetUserState } = authSlice.actions;
export const userAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
