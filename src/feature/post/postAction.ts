import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPost, getAllPosts, saveAnyPost, fetchSavedAllPost } from "./postAPI";



export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAll",
  async (input: {userId: number}, { rejectWithValue }) => {
    const page = 1;
    const pageSize = 10;
    try {
      const { userId } = input;
      const allPosts = await getAllPosts(userId, page, pageSize);
      console.log("all Posts : ", allPosts);
      return allPosts;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSavedPosts = createAsyncThunk('posts/fetchSaved', async (input: {userId: number}, { rejectWithValue }) => {
  try {
    const { userId } = input;
    const data = await fetchSavedAllPost(userId);
    console.log("Fetch all saved post : ", data);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch saved posts');
  }
});

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (
    newPost: { userId: string; caption: string; tags: string; image: string },
    thunkAPI
  ) => {
    try {
      const { userId, caption, tags, image } = newPost;

      const data = await createPost({ userId, caption, tags, image });
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Failed to add post");
    }
  }
);

export const savePost = createAsyncThunk(
  'posts/savePost',
  async (input: { userId: number; postId: number }, { rejectWithValue }) => {
    try {
      const { userId, postId } = input;
      const data = await saveAnyPost(userId, postId);
      console.log("Saved any post : ", data);
      return data
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to save post');
    }
  }
);
