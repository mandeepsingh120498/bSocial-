import React from 'react';
import { FaHome, FaUsers, FaBookmark, FaSignOutAlt } from 'react-icons/fa';
import { IoIosCreate } from "react-icons/io";
import UserAvatar from '../../assets/images/user-avatar.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetUserState } from '../../feature/auth/authSlice';
import { userAuth } from '../../feature/auth/authSlice';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(userAuth);

  const handleLogout = () => {
    sessionStorage.clear();
    dispatch(resetUserState());
    navigate('/');
  };

  const navLinks = [
    { path: '/home', label: 'Home', icon: <FaHome size={20} /> },
    { path: '/people', label: 'People', icon: <FaUsers size={20} /> },
    { path: '/saved', label: 'Saved', icon: <FaBookmark size={20} /> },
    { path: '/post', label: 'Create Post', icon: <IoIosCreate size={20} /> },
  ];

  return (
    <div className={`hidden md:block w-64 bg-blue-600 text-white h-screen transition-all duration-300 ease-in-out`}>
      <div className="flex justify-center items-center p-4">
        <span className="text-white font-bold text-xl">bSocial</span>
      </div>
      <hr />
      <div className="flex items-center space-x-4 p-4 bg-blue-600 rounded-lg cursor-pointer">
        <img
          src={UserAvatar}
          alt="Avatar"
          className="w-12 h-12 rounded-full border-2 border-white"
        />
        <div className="text-white">
          <div className="font-semibold">{user?.username}</div>
        </div>
      </div>
      <hr />
      <nav className="mt-4 space-y-4">
        {navLinks.map(({ path, label, icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center space-x-4 p-4 rounded-lg ${
              location.pathname === path ? 'bg-blue-800' : 'hover:bg-blue-800'
            }`}
          >
            {icon}
            <span className="text-lg">{label}</span>
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-0 w-64">
        <hr />
        <button
          onClick={handleLogout}
          className="flex justify-center items-center space-x-4 w-full p-4 hover:bg-blue-800 rounded-lg"
        >
          <FaSignOutAlt size={20} />
          <span className="text-lg">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
