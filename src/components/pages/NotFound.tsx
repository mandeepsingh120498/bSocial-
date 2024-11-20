import React from 'react';
import Notfound from '../../assets/images/not-found.png';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-md w-full p-4 text-center">
        <img src={Notfound} alt="Not Found" className="w-64 h-64 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-6">
          Sorry, the page you are looking for does not exist.
        </p>
        <a href="/home" className="text-blue-600 hover:underline">
          Go back to the homepage
        </a>
      </div>
    </div>
  );
};

export default NotFound;
