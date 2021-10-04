import React from 'react';
const Card = ({ children }) => {
  return (
    <div className='w-auto bg-indigo-300 h-auto m-2 shadow-xl p-4'>
      {children}
    </div>
  );
};
export default Card;
