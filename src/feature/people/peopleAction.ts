import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers, followUser, unfollowUser } from './peopleAPI';

// Fetch Users
export const fetchUsers = createAsyncThunk(
  'people/fetchUsers',
  async (input: {userId: number}, { rejectWithValue }) => {
    try {
      const { userId } = input;
      const users = await getAllUsers(userId);
      return users;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Follow User
export const followUserAction = createAsyncThunk(
  'people/followUser', 
  async (
    { followerId, followingId }: { followerId: number; followingId: number },
    { rejectWithValue }
  ) => {
    try {
      const updatedUsers = await followUser(followerId, followingId);
      return updatedUsers;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Unfollow User
export const unfollowUserAction = createAsyncThunk(
  'people/unfollowUser', 
  async (
    { followerId, followingId }: { followerId: number, followingId:number },
    { rejectWithValue }
  ) => {
    try {
      const updatedUsers = await unfollowUser(followerId, followingId);
      return updatedUsers;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);