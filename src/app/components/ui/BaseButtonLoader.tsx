import React from 'react';

const BaseButtonLoader = () => {
  return (
    <div className="flex flex-row gap-2 justify-center">
      <div className="w-1 h-1 rounded-full bg-gray-400 animate-bounce" />
      <div className="w-1 h-1 rounded-full bg-gray-400 animate-bounce [animation-delay:-.3s]" />
      <div className="w-1 h-1 rounded-full bg-gray-400 animate-bounce [animation-delay:-.5s]" />
    </div>
  );
}

export default BaseButtonLoader;
