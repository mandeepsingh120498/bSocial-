import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { resetUserState } from '../../feature/auth/authSlice';

const Topbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    sessionStorage.clear();
    dispatch(resetUserState());
    navigate('/');
  };

  return (
    <header className="md:hidden sticky bg-blue-600 text-white top-0 z-50 shadow-md w-full">
      <div className="flex justify-between items-center py-3 px-4">
        <h1 className="text-lg md:text-2xl font-bold">bSocial</h1>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 p-2 hover:bg-blue-800 rounded-lg"
        >
          <FaSignOutAlt size={20} />
          <span className="hidden sm:inline text-lg">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
