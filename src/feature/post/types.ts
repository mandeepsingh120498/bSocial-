export interface User {
  id: number;
  username: string;
}

export interface Post {
  id: number;
  caption: string;
  image_url: string;
  created_at: string;
  user: User;
  tagged_users_info: User[];
}

export interface PostState {
  posts: Post[];
  savedPosts: Post[];
  loading: boolean;
  error: string | null;
}
