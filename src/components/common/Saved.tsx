import React, { useEffect } from 'react';
import Post from '../common/Post';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { postInfo } from '../../feature/post/postSlice';
import { fetchSavedPosts } from '../../feature/post/postAction';
import Loader from '../common/Loader';
import { userAuth } from "../../feature/auth/authSlice";

const Saved: React.FC = () => {

  const dispatch = useAppDispatch();
  const {user} = useAppSelector(userAuth);
  const { savedPosts, loading } = useAppSelector(postInfo);
  const userId = user?.id || -1;

  useEffect(() => {
    dispatch(fetchSavedPosts({userId}))
  }, []);

  if (loading) {
    return <Loader />; 
  }

  return (
    <div className="p-4 bg-white rounded-lg md:w-[800px] mx-auto mt-10">
      <h2 className="text-2xl font-bold">Saved Posts</h2>
      <div className="space-y-4 mt-4 h-[600px] overflow-y-auto no-scrollbar">
        {savedPosts.length === 0 ? (
          <p className="text-gray-500">You have no saved posts.</p>
        ) : (
          savedPosts.map((post) => (
            <Post
              key={post.id}
              caption={post.caption}
              imageUrl={post.image_url}
              createdAt={post.created_at}
              postId={post.id}
              user={post?.user}
              taggedUsersInfo={post.tagged_users_info}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Saved;
