import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers, followUserAction, unfollowUserAction } from './peopleAction';
import { PeopleState } from './types';
import { RootState } from '../../app/store';

const initialState: PeopleState = {
  users: [],
  removedUsers: [],
  loading: false,
  error: null,
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    removeUser: (state, action: PayloadAction<number>) => {
      if (!state.removedUsers.includes(action.payload)) {
        state.removedUsers.push(action.payload);
      }
    },
    restoreUser: (state, action: PayloadAction<number>) => {
      state.removedUsers = state.removedUsers.filter(id => id !== action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.users = action.payload.map((user: any) => ({
          id: user.id,
          username: user.username,
          email: user.email,
          bio: user.bio,
          isFollowing: user.isFollowing,
        }));
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

     // Follow User
      .addCase(followUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(followUserAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(followUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Unfollow User
      .addCase(unfollowUserAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(unfollowUserAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(unfollowUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { removeUser, restoreUser, clearError } = peopleSlice.actions;

export const peopleInfo = (state: RootState) => ({
  users: state.people.users.filter(user => !state.people.removedUsers.includes(Number(user.id))),
  removedUsers: state.people.removedUsers,
  loading: state.people.loading,
  error: state.people.error,
});

export default peopleSlice.reducer;
