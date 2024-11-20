export interface AuthState {
  isAuthenticated: boolean;
  user: null | { email: string; username: string; uid: string; id: number; refreshToken: string; accessToken: string };
  loading: boolean;
  isSignInError: string | null;
  isSignUpError: string | null;
}

export interface UserSignInData {
  email: string;
  password: string;
}

export interface UserSignUpData {
  email: string;
  password: string;
  username: string;
}
