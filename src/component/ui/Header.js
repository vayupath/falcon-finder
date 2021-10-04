import React from 'react';
import { NavLink } from 'react-router-dom';
const Header = (props) => {
  return (
    <header className='text-gray-700 body-font bg-blue-700'>
      <div className='container mx-auto flex flex-wrap p-2 flex-row items-center'>
        <a className='flex title-font font-medium  text-gray-900 mb-4 md:mb-0'>
          <span className='ml-3 text-3xl text-white'>Falcon Finder</span>
        </a>
        <nav className='ml-auto flex flex-wrap  text-base justify-center'>
          <NavLink
            to='/'
            exact
            className='mr-5 text-white hover:text-gray-900 hover:bg-indigo-200 pl-2 pr-2 rounded-sm cursor-pointer'
          >
            Reset
          </NavLink>
          <span className='text-white'> </span>
          <a className='mr-5 text-white hover:text-gray-900 hover:bg-indigo-200 pl-2 pr-2 rounded-sm cursor-pointer'>
            Geek Trust
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
