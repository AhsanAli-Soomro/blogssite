"use client";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { faBars, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import SubNav from './SubNav';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setIsVisible(isScrollingUp);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div>
      <nav
        className={`top-0 fixed w-full z-10 px-4 py-4 flex justify-between items-center backdrop-blur-lg transition-transform duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        <Link className="text-3xl font-bold leading-none" href="/">
         <Image src="/logo.svg" width={200} height={50}/>
        </Link>
        {/* <h1 className='text-xl text-blue-500 hidden px-4 text-center font-bold sm:flex'>
        YOUR PULSE ON NEWS TRENDS AND THOUGHTFUL INSIGHTS
        </h1> */}
        {/* <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <li><Link className="text-sm text-gray-400 hover:text-gray-500" href="/">Home</Link></li>
          <li className="text-gray-300">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </li>
          <li><Link className="text-sm text-gray-400 hover:text-gray-500" href="/">Blogs</Link></li>
          <li className="text-gray-300">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </li>
          <li><Link className="text-sm text-gray-400 hover:text-gray-500" href="#">News</Link></li>
          <li className="text-gray-300">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </li>
          <li><Link className="text-sm text-gray-400 hover:text-gray-500" href="#">Reviews</Link></li>
          <li className="text-gray-300">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </li>
          <li><Link className="text-sm text-gray-400 hover:text-gray-500" href="/About">About</Link></li>
        </ul> */}
        <div className="flex">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200">
              <SignInButton mode="modal">Sign In</SignInButton>
            </div>
            <div className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200">
              <SignUpButton mode="modal">Sign up</SignUpButton>
            </div>
          </SignedOut>
          <div className="lg:hidden">
            <button className="navbar-burger flex items-center text-blue-600 p-3" onClick={() => setIsOpen(!isOpen)}>
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </nav>
      <SubNav />


      {/* Mobile Menu */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 z-10 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <Link className="mr-auto text-3xl font-bold leading-none" href="/">
              <svg width="179.99999999999997" height="64.01948842874543" viewBox="0 0 410.49999999999994 146" className="looka-1j8o68f">
                {/* SVG content here */}
              </svg>
            </Link>
            <button className="navbar-close" onClick={() => setIsOpen(false)}>
              <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              <li className="mb-1">
                <Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="/">Home</Link>
              </li>
              <li className="mb-1">
                <Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="/">Blogs</Link>
              </li>
              <li className="mb-1">
                <Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="#">News</Link>
              </li>
              <li className="mb-1">
                <Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="#">Reviews</Link>
              </li>
              <li className="mb-1">
                <Link className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded" href="/About">About</Link>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <div className="pt-6">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <div className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl">
                  <SignInButton mode="modal">Sign in</SignInButton>
                </div>
                <div className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl">
                  <SignUpButton mode="modal">Sign Up</SignUpButton>
                </div>
              </SignedOut>
            </div>
            <p className="my-4 text-xs text-center text-gray-400">
              <span>Copyright © 2024</span>
            </p>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
