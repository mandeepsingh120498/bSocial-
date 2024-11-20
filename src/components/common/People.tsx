import React, { useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { peopleInfo, removeUser } from '../../feature/people/peopleSlice';
import { fetchUsers, followUserAction, unfollowUserAction } from '../../feature/people/peopleAction';
import { userAuth } from "../../feature/auth/authSlice";
import { FollowUnfollowResponse, FollowUnfollowError } from '@/feature/people/types';
import Swal from 'sweetalert2';
import { fetchAllPosts } from '../../feature/post/postAction';

const People: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(peopleInfo);
  const { user } = useAppSelector(userAuth);
  const userId = user?.id || -1;

  useEffect(() => {
    dispatch(fetchUsers({ userId }));
  }, [dispatch]);

  const handleFollow = async (Id: number) => {
    try {
      const response = await dispatch(followUserAction({ followerId: userId, followingId: Id }));
      if (response.meta.requestStatus === 'fulfilled') {
        const { message } = response.payload as FollowUnfollowResponse;
        Swal.fire({
          icon: "success",
          title: message,
          showConfirmButton: false,
          timer: 2500
        });
        dispatch(fetchUsers({ userId }));
        dispatch(fetchAllPosts({ userId }));
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
      console.error("Follow action failed:", error);
      Swal.fire({
        icon: "error",
        title: 'An error occurred while following the user.',
        showConfirmButton: false,
        timer: 2500
      });
    }
  };

  const handleUnfollow = async (Id: number) => {
    try {
      const response = await dispatch(unfollowUserAction({ followerId: userId, followingId: Id }));
      if (response.meta.requestStatus === 'fulfilled') {
        const { message } = response.payload as FollowUnfollowResponse;
        Swal.fire({
          icon: "success",
          title: message,
          showConfirmButton: false,
          timer: 2500
        });
        dispatch(fetchUsers({ userId }));
        dispatch(fetchAllPosts({ userId }));
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
    }
  };

  const handleRemove = (userId: number) => {
    dispatch(removeUser(userId));
    console.warn(`Removed user with ID: ${userId}`);
  };

  const isOnPeoplePage = location.pathname === '/people';

  return (
    <div
      className={`p-4 ${
        isOnPeoplePage ? 'flex flex-col mx-auto mt-10' : ''
      } bg-white rounded-lg`}
    >
      <h2 className="text-2xl font-bold">People</h2>
      <p className="text-sm text-gray-500 mb-4">Let's grow together...</p>
      <div
        className={`space-y-4 rounded-lg p-4 h-[600px] overflow-y-auto no-scrollbar ${
          isOnPeoplePage ? 'w-full max-w-7xl' : 'border'
        }`}
      >
        {users.map((user) => (
          <div
            key={user.id}
            className={`flex items-center justify-between p-4 bg-gray-100 rounded-lg ${
              isOnPeoplePage ? 'shadow-md' : ''
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                <FaUserCircle size={40} className="text-gray-500" />
              </div>
              <div>
                <h3
                  className="text-lg font-semibold max-w-xs overflow-hidden text-ellipsis whitespace-nowrap"
                  title={user.username}
                >
                  {user.username}
                </h3>
                <p
                  className="text-sm text-gray-500 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap"
                  title={user.email}
                >
                  {user.email}
                </p>
                {isOnPeoplePage && (
                  <p className="text-sm text-gray-500 mt-2">
                    Additional information about {user.username} can go here.
                  </p>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              {user.isFollowing ? (
                <button
                  onClick={() => handleUnfollow(Number(user.id))}
                  className="bg-blue-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-700"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => handleFollow(Number(user.id))}
                  className="bg-blue-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-700"
                >
                  Follow
                </button>
              )}
              <button
                onClick={() => handleRemove(Number(user.id))}
                className="bg-red-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;
