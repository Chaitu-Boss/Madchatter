import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-4 text-green-400 font-semibold text-lg">Getting response...</span>
    </div>
  );
};

export default Loader;
