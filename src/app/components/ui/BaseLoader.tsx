import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-row gap-2 justify-center">
      <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-white animate-bounce" />
      <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-white animate-bounce [animation-delay:-.3s]" />
      <div className="w-3 h-3 rounded-full bg-gray-400  dark:bg-white animate-bounce [animation-delay:-.5s]" />
    </div>
  );
}

export default Loader;
