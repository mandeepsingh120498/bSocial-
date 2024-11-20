import React from 'react';


const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="spinner-3 w-10 h-10 rounded-full bg-gray-800 relative">
        <div className="absolute w-full h-full bg-gray-800 rounded-full animate-ping"></div>
        <div className="absolute w-full h-full bg-gray-800 rounded-full animate-ping delay-200"></div>
      </div>
    </div>
  );
};

export default Loader;
