import { createAsyncThunk } from "@reduxjs/toolkit";
import { signIn, signUp, logout } from "./authAPI";
import { UserSignInData, UserSignUpData } from "./types";
import { storeEncryptedKeyValuePairs } from "./utils";

export const signUpUser = createAsyncThunk(
  "auth/signUp",
  async (data: UserSignUpData, { rejectWithValue }) => {
    try {
      const response = await signUp(data.email, data.password, data.username);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInUser = createAsyncThunk(
  "auth/signIn",
  async (data: UserSignInData, { rejectWithValue }) => {
    try {
      const user = await signIn(data.email, data.password);
      storeEncryptedKeyValuePairs(user);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await logout();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
