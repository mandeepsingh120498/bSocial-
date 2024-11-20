import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../feature/auth/authSlice';
import postReducer from '../feature/post/postSlice';
import peopleReducer from '../feature/people/peopleSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    people: peopleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
