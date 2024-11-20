import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { signUpUser } from '../../feature/auth/authAction';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as EmailIcon } from '../../assets/images/email-icon.svg';
import { ReactComponent as PasswordVisibilityIcon } from '../../assets/images/password-visibility-icon.svg';
import { ReactComponent as UserIcon } from '../../assets/images/user-icon.svg';
import { userAuth, resetAuthError } from '../../feature/auth/authSlice';
import Swal from 'sweetalert2';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({ username: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, isSignUpError } = useAppSelector(userAuth);

  useEffect(() => {
    dispatch(resetAuthError());
  }, []);

  useEffect(() => {
    if (isSignUpError) {
      Swal.fire({
        icon: "error",
        title: isSignUpError,
        showConfirmButton: false,
        timer: 2500
      });
    }
  }, [isSignUpError]);
  
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) => {
    const minLength = 6;
    const maxLength = 20;
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/;
    return password.length >= minLength && password.length <= maxLength && pattern.test(password);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { username, email, password } = formData;

    const newErrors = {
      username: username ? '' : 'Name is required.',
      email: validateEmail(email) ? '' : 'Invalid email address.',
      password: validatePassword(password)
        ? ''
        : 'Password must be 6-20 characters long, include at least one uppercase letter, one lowercase letter, and one special character.',
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      dispatch(signUpUser(formData)).then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          Swal.fire({
            icon: 'success',
            title: 'Account created successfully!',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            navigate('/');
          });
        }
      });
    }
  };

  return (
    <div className="font-[sans-serif] bg-white flex items-center justify-center md:h-screen p-4">
      <div className="shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] max-w-6xl max-md:max-w-lg rounded-md p-6">
        <div className="grid md:grid-cols-2 items-center gap-8 h-full">
          <div className="max-md:order-1 p-4 bg-gray-50 h-full">
            <img
              src="https://readymadeui.com/signin-image.webp"
              className="lg:max-w-[90%] w-full h-full object-contain block mx-auto"
              alt="signup-image"
            />
          </div>

          <div className="flex items-center p-6 h-full w-full">
            <form className="max-w-lg w-full mx-auto" onSubmit={handleSubmit}>
              <div className="mb-12">
                <h3 className="text-4xl font-extrabold text-blue-600">Create an account</h3>
              </div>

              
              {/* Full Name Field */}
              <div>
                <label className="text-gray-800 text-xs block mb-2">Full Name</label>
                <div className="relative flex items-center">
                  <input
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`w-full bg-transparent text-sm border-b ${
                      errors.username ? 'border-red-500' : 'border-gray-300'
                    } focus:border-blue-500 px-2 py-3 outline-none`}
                    placeholder="Enter name"
                  />
                  <UserIcon className="w-[18px] h-[18px] absolute right-2" />
                </div>
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
              </div>

              {/* Email Field */}
              <div className="mt-6">
                <label className="text-gray-800 text-xs block mb-2">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-transparent text-sm border-b ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:border-blue-500 px-2 py-3 outline-none`}
                    placeholder="Enter email"
                  />
                  <EmailIcon className="w-[18px] h-[18px] absolute right-2" />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div className="mt-6">
                <label className="text-gray-800 text-xs block mb-2">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full bg-transparent text-sm border-b ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    } focus:border-blue-500 px-2 py-3 outline-none`}
                    placeholder="Enter password"
                  />
                  <PasswordVisibilityIcon className="w-[18px] h-[18px] absolute right-2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}/>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Submit Button */}
              <div className="mt-12">
                <button
                  type="submit"
                  className="w-full py-3 px-6 text-sm tracking-wider font-semibold rounded-md bg-blue-600 hover:bg-blue-700 text-white focus:outline-none"
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
                <p className="text-sm mt-6 text-center text-gray-800">
                  Already have an account?{' '}
                  <a
                    onClick={() => navigate('/')}
                    className="text-blue-600 font-semibold hover:underline ml-1 cursor-pointer"
                  >
                    Login here
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
