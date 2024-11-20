export interface User {
    id: number;
    username: string;
    email: string;
    bio: string;
    isFollowing: boolean;
  }
  
  export interface PeopleState {
    users: User[];
    removedUsers: number[];
    loading: boolean;
    error: string | null;
  }

export interface FollowUnfollowResponse {
  message: string;
  success: boolean;
}

export interface FollowUnfollowError {
  message: string;
}