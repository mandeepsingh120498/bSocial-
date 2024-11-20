import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostState } from './types';
import { addPost, fetchAllPosts, savePost, fetchSavedPosts} from './postAction';
import { RootState } from '../../app/store';

const initialState: PostState = {
  posts: [],
  savedPosts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Posts
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        const normalizedPosts = action?.payload?.posts?.map((post) => ({
          ...post,
          user: Array.isArray(post.user) ? post.user[0] : post.user,
        })) || [];
        state.posts = normalizedPosts.map((post) => ({
          id: post.id,
          caption: post.caption,
          image_url: post.image_url,
          created_at: post.created_at,
          user: {
            id: post.user.id,
            username: post.user.username,
          },
          tagged_users_info: post.tagged_users_info.map((user) => ({
            id: user.id,
            username: user.username,
          })),
        }));        
      })
      .addCase(fetchAllPosts.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Saved Posts
      .addCase(fetchSavedPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedPosts.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        const normalizedPosts = action.payload.posts.map((post) => ({
          ...post,
          posts: Array.isArray(post.posts) ? post.posts[0] : post.posts,
        }));
        state.savedPosts = normalizedPosts.map((item) => ({
          id: item.posts.id,
          caption: item.posts.caption,
          image_url: item.posts.image_url,
          created_at: item.posts.created_at,
          user: Array.isArray(item.posts.user)
          ? item.posts.user[0]
          : item.posts.user,
          tagged_users_info: item.posts.tagged_users_info.map((user) => ({
            id: user.id,
            username: user.username,
          })),
        }));
      })
      .addCase(fetchSavedPosts.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Post
      .addCase(addPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addPost.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(savePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(savePost.fulfilled, (state, action) => {
        state.loading = false;
        console.log("94 postSlice.ts Action : ", action)
      })
      .addCase(savePost.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const postInfo = (state: RootState) => state.post;
export default postSlice.reducer;
