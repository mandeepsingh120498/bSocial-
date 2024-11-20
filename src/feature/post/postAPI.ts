import { supabase } from "../../api/SupabaseClient";

export const createPost = async (post: {
  userId: string;
  caption: string;
  tags?: string;
  image: string;
}) => {
  const { userId, caption, tags, image } = post;

  const postTags = tags ? tags.split(",") : [];

  try {
    const { data, error: postError } = await supabase
      .from("posts")
      .insert([
        {
          user_id: userId,
          caption,
          image_url: image,
        },
      ])
      .select("id");

    if (postError) {
      console.error("Error creating post:", postError);
      throw new Error(postError.message);
    }

    const postId = data[0]?.id;

    if (postId && postTags.length > 0) {
      const { error: tagError } = await supabase.from("post_tags").insert(
        postTags.map((taggedUserId) => ({
          post_id: postId,
          tagged_user_id: parseInt(taggedUserId),
        }))
      );

      if (tagError) {
        console.error("Error adding tags:", tagError);
        throw new Error(tagError.message);
      }
    }

    return data;
  } catch (error) {
    console.error("Unexpected error while creating post:", error);
    throw error;
  }
};

export const getAllPosts = async (
  userId: number,
  page: number = 1,
  pageSize: number = 10
) => {
  try {
    // Step 1: Fetch the list of following IDs from the followers table
    const { data: followers, error: followersError } = await supabase
      .from("followers")
      .select("following_id")
      .eq("follower_id", userId);

    if (followersError) {
      console.error("Error fetching followers:", followersError);
      return { error: followersError };
    }

    // Step 2: Extract the following IDs (users that the logged-in user is following)
    const followingIds = followers.map((f) => f.following_id);

    // Step 3: Fetch the posts created by the logged-in user or their followers
    const { data, error: postsError, count } = await supabase
      .from("posts")
      .select(
        `
          id, caption, image_url, created_at, user_id, 
          user: usersInfo!posts_user_id_fkey(id, username),
          tagged_users_info: usersInfo!post_tags(id, username)
        `
      )
      .in("user_id", [userId, ...followingIds])
      .order("created_at", { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (postsError) {
      console.error("Error fetching posts:", postsError);
      return { error: postsError };
    }

    return { posts: data, count };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: error };
  }

};

export const saveAnyPost = async (
  user_id: number,
  post_id: number
): Promise<{ success: boolean; message: string }> => {
  try {
    const { data, error } = await supabase
      .from("saved_posts")
      .insert([{ post_id, user_id }]);

    if (error) {
      console.error("Error saving post:", error);
      return { success: false, message: error.message };
    }

    console.log("Post saved successfully:", data);
    return { success: true, message: "Post saved successfully" };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { success: false, message: "Unexpected error occurred" };
  }
};

export const fetchSavedAllPost = async (
  userId: number,
  page: number = 1,
  pageSize: number = 10
) => {
  try {
    const { data, error, count } = await supabase
      .from("saved_posts")
      .select(
        `
        post_id,
        posts (
          id,
          caption,
          image_url,
          created_at,
          user_id,
          user: usersInfo!posts_user_id_fkey(id, username),
          tagged_users_info: usersInfo!post_tags(id, username)
        )
      `,
        { count: "exact" }
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (error) {
      throw error;
    }

    return {
      posts: data,
      totalCount: count,
    };
  } catch (error) {
    console.error("Error fetching saved posts:", error);
    throw error;
  }
};
