import React, { useEffect } from "react";
import Post from "../common/Post";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { postInfo } from "../../feature/post/postSlice";
import { fetchAllPosts } from "../../feature/post/postAction";
import Loader from "../common/Loader";
import { userAuth } from "../../feature/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector(userAuth);
  const { posts, loading } = useAppSelector(postInfo);
  const userId = user?.id || -1;

  useEffect(() => {
    dispatch(fetchAllPosts({ userId }));
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  const handleCreatePostRedirect = () => {
    navigate("/post");
  };

  return (
    <>
      <div className="p-4 bg-white rounded-lg md:w-[800px] mx-auto mt-10">
        <h1 className="text-2xl font-bold ">News Feed</h1>
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[650px] space-y-4 text-center">
            <p className="text-xl text-gray-600">
              No posts created yet. Be the first to share your thoughts!
            </p>
            <button
              onClick={handleCreatePostRedirect}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
            >
              Create a Post
            </button>
          </div>
        ) : (
          <div className="h-[650px] overflow-y-auto no-scrollbar">
            {posts.map((post) => (
              <Post
                key={post.id}
                caption={post.caption}
                imageUrl={post.image_url}
                createdAt={post.created_at}
                postId={post.id}
                user={post?.user}
                taggedUsersInfo={post.tagged_users_info}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
