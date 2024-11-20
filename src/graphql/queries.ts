import { POST_FIELDS } from "./fragments";

export const FETCH_ALL_POSTS = `
  query FetchAllPosts {
    posts(order_by: {created_at: desc}) {
      ${POST_FIELDS}
    }
  }
`;

export const FETCH_SAVED_POSTS = `
  query FetchSavedPosts($userId: Int!) {
    saved_posts(where: {user_id: {_eq: $userId}}) {
      post {
        ${POST_FIELDS}
      }
    }
  }
`;

export const fetchUsersQuery = (currentUserId: string) => `
  query {
    usersInfo(
      where: { firebase_uid: { _neq: "${currentUserId}" } }
    ) {
      id
      username
      email
      bio
    }
  }
`;