import React, { useState } from 'react';
import { FaHeart, FaBookmark, FaUserCircle, FaEllipsisH } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from "../../app/hooks";
import { getDecryptedValue } from '../../feature/auth/utils';
import { savePost } from '../../feature/post/postAction';
import { FollowUnfollowResponse, FollowUnfollowError } from '@/feature/people/types';
import Swal from 'sweetalert2';
import { fetchUsers, unfollowUserAction } from '../../feature/people/peopleAction';
import { fetchAllPosts } from '../../feature/post/postAction';

interface User {
  id: number;
  username: string;
}

interface PostProps {
  caption: string;
  imageUrl: string;
  createdAt: string;
  postId: number;
  user: User;
  taggedUsersInfo: User[];
}

const Post: React.FC<PostProps> = ({ caption, imageUrl, createdAt, postId, user, taggedUsersInfo }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const currentUserId = Number(getDecryptedValue("id"));

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = async (postId: number) => {
    const response = await dispatch(
      savePost({ userId: currentUserId, postId: postId })
    );

    console.log("response : ", response);
    setIsSaved(!isSaved);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleUnfollow = async (Id: number) => {
    try {
      const response = await dispatch(unfollowUserAction({ followerId: currentUserId, followingId: Id }));
      if (response.meta.requestStatus === 'fulfilled') {
        const { message } = response.payload as FollowUnfollowResponse;
        Swal.fire({
          icon: "success",
          title: message,
          showConfirmButton: false,
          timer: 2500
        });
        dispatch(fetchUsers({userId: currentUserId}))
        dispatch(fetchAllPosts({ userId: currentUserId }))
      } else if (response.meta.requestStatus === 'rejected') {
        const { message } = response.payload as FollowUnfollowError;
        Swal.fire({
          icon: "error",
          title: message,
          showConfirmButton: false,
          timer: 2500
        });
      }
    } catch (error) {
      console.error("Unfollow action failed:", error);
      Swal.fire({
        icon: "error",
        title: 'An error occurred while unfollowing the user.',
        showConfirmButton: false,
        timer: 2500
      });
    } finally {
      setMenuOpen(false);
    }
  };

  const handleDelete = () => {
    console.log('Delete clicked');
    setMenuOpen(false);
  };

  const isPostOwner = user.id === currentUserId;
  const isOnHomeOrSaved = location.pathname === '/home' || location.pathname === '/saved';
  const isOnProfilePage = location.pathname.includes('/profile');

  return (
    <div className="bg-white border m-6 rounded-lg p-4 mb-6 max-w-full sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
      {/* Avatar and User Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gray-300">
            <FaUserCircle size={48} className="text-gray-500" />
          </div>
          <div>
            <div className="font-semibold text-lg">{user.username}</div>
            <div className="text-sm text-gray-500">
              {taggedUsersInfo.length > 0
                ? `Tagged: ${taggedUsersInfo.map((user) => user.username).join(', ')}`
                : 'No tagged users'}
            </div>
          </div>
        </div>
        <div className="relative">
          <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-800">
            <FaEllipsisH size={20} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md border">
              <ul className="text-sm text-gray-700">
                {/* Show Unfollow button on Home or Saved */}
                {isOnHomeOrSaved && !isPostOwner && (
                  <li>
                    <button
                      onClick={() => handleUnfollow(user.id)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Unfollow
                    </button>
                  </li>
                )}

                {/* Show Delete button only if the post is owned by the user or on Profile page */}
                {(isOnHomeOrSaved && isPostOwner) || isOnProfilePage ? (
                  <li>
                    <button
                      onClick={handleDelete}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </li>
                ) : null}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Post Text */}
      <p className="mt-4 text-gray-800 text-base sm:text-lg">{caption}</p>

      {/* Post Image */}
      <div className="mt-4">
        <img src={imageUrl} alt="Post" className="w-full rounded-lg" />
      </div>

      {/* Like and Save Options */}
      <div className="flex items-center justify-between mt-4">
        {/* Like Button */}
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 text-lg ${isLiked ? 'text-red-500' : 'text-gray-600'}`}
        >
          <FaHeart />
          <span>{isLiked ? 'Liked' : 'Like'}</span>
        </button>

        {/* Save Button - Hide on /saved */}
        {location.pathname !== '/saved' && (
          <button
            onClick={() => handleSave(postId)}
            className={`flex items-center space-x-2 text-lg ${isSaved ? 'text-yellow-500' : 'text-gray-600'}`}
          >
            <FaBookmark />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
