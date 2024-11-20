export const ADD_POSTS_QUERY = `
  query GetPosts {
    posts {
      id
      userId
      caption
      tags
      imageUrl
    }
  }
`;


export const DELETE_POST = `
  mutation DeletePost($postId: Int!) {
    delete_posts_by_pk(id: $postId) {
      id
    }
  }
`;

export const SAVE_POST = `
  mutation SavePost($userId: Int!, $postId: Int!) {
    insert_saved_posts_one(object: {user_id: $userId, post_id: $postId}) {
      user_id
      post_id
    }
  }
`;

export const FOLLOW_USER = `
    mutation FollowUser($followerId: Int!, $followingId: Int!) {
    insert_followers_one(
        object: { follower_id: $followerId, following_id: $followingId, status: "approved" }
    ) {
        follower_id
        following_id
        status
        created_at
    }
    }
`;

export const UNFOLLOW_USER = `
    mutation UnfollowUser($followerId: Int!, $followingId: Int!) {
    delete_followers(
        where: {
        follower_id: { _eq: $followerId },
        following_id: { _eq: $followingId }
        }
    ) {
        affected_rows
    }
    }
`;
