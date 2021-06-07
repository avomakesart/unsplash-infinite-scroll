import React from 'react';

export const Container = ({ children }) => {
  return (
    <div className='h-screen pb-16 overflow-y-auto'>
      <div className='container flex justify-center px-6 mx-auto 2xl:max-w-screen-xl'>
        <div className='px-4 py-6 flex flex-col sm:px-0'>
          {children}
        </div>
      </div>
    </div>
  );
};
