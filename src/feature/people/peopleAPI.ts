import { supabase } from '../../api/SupabaseClient';
import { User } from './types';
export const getAllUsers = async (currentUserId: number) => {
  try {
    const { data, error } = await supabase
      .from('usersInfo')
      .select('id, username, email, bio')
      .neq('id', currentUserId);

    if (error) {
      console.error('Error fetching users:', error);
      throw error;
    }

    const { data: followingData, error: followingError } = await supabase
      .from('followers')
      .select('following_id')
      .eq('follower_id', currentUserId);

    if (followingError) {
      console.error('Error fetching following users:', followingError);
      throw followingError;
    }
    const followingIds = followingData.map(follow => follow.following_id);

    const enrichedUsers = data?.map(user => ({
      ...user,
      isFollowing: followingIds.includes(user.id),
    }));
    return enrichedUsers;
  } catch (error) {
    console.error('Unexpected error:', error);
    throw error;
  }
};

// Follow user
export const followUser = async (followerId: number, followingId: number) => {
  try {
    const { data, error } = await supabase
      .from('followers')
      .select('*')
      .eq('follower_id', followerId)
      .eq('following_id', followingId)
      .single();
    
    if (data) {
      return { message: 'You are already following this user.' };
    }

    const { data: followData, error: followError } = await supabase
      .from('followers')
      .insert([{ follower_id: followerId, following_id: followingId }]);

    if (followError) {
      throw followError;
    }

    return { message: 'You are now following this user.' };
  } catch (error: unknown) {
    const e = error as Error; // Type assertion
    console.error('Error following user:', e);
    return { error: e.message || 'An error occurred while following the user.' };
  }
};

// Unfollow user
export const unfollowUser = async (followerId: number, followingId: number) => {
  try {
    const { data, error } = await supabase
      .from('followers')
      .delete()
      .eq('follower_id', followerId)
      .eq('following_id', followingId);

    if (error) {
      throw error;
    }

    if (!data) {
      return { message: 'You are not following this user.' };
    }

    return { message: 'You have unfollowed this user.' };
  } catch (error: unknown) {
    const e = error as Error; // Type assertion
    console.error('Error unfollowing user:', e);
    return { error: e.message || 'An error occurred while unfollowing the user.' };
  }
};
