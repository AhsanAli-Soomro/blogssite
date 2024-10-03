"use client"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { faBars, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setisOpen] = useState(false);
  return (
    <div className='top-0 fixed w-full z-10 '>
      <nav className="relative px-4 py-4 flex justify-between items-center backdrop-blur-lg">
        <Link className="text-3xl font-bold leading-none" href="/">
          <svg width="179.99999999999997" height="64.01948842874543" viewBox="0 0 410.49999999999994 146" class="looka-1j8o68f"><defs id="SvgjsDefs6773"></defs><g id="SvgjsG6774" featurekey="symbolGroupContainer" transform="matrix(1,0,0,1,0,0)" fill="#3b82f6"><rect xmlns="http://www.w3.org/2000/svg" width="121" height="146" rx="10" ry="10"></rect></g><g id="SvgjsG6775" featurekey="odWo6G-0" transform="matrix(1.3279798873944544,0,0,1.3279798873944544,-6.523351653779333,6.183964099801532)" fill="#ffffff"><path xmlns="http://www.w3.org/2000/svg" d="M63.738,11.716c-1.346-0.751-3.007-0.715-4.748-0.038c0.704,0.035,1.369,0.21,1.969,0.545  c3.614,2.016,3.597,8.938-0.041,15.459c-0.668,1.198-1.337,2.395-2.004,3.593c-1.269,2.274-3.193,4.725-4.067,7.161  c-0.211,0.587-0.81,2.75-0.689,3.273c0.458,1.991,4.407-5.333,4.681-5.824c1.62-2.903,3.24-5.807,4.858-8.71  C67.334,20.653,67.352,13.731,63.738,11.716z"></path><path xmlns="http://www.w3.org/2000/svg" d="M76.843,90.36c-0.569,0-1.07-0.114-1.513-0.341c-1.473-0.758-1.814-2.49-2.144-4.168c-0.296-1.511-0.576-2.938-1.579-3.457  c-1.5-0.775-4.547-0.281-6.369,0.018l-0.198,0.032c-1.651,0.269-3.417,0.817-5.287,1.399c-2.51,0.779-5.103,1.586-7.479,1.683  l-0.966,0.039l0.076-0.962c0.043-0.545,0.293-1.114,0.559-1.72c0.545-1.239,0.72-1.847,0.321-2.161  c-0.835-0.66-3.362-0.4-7.505,0.772L44.35,81.61c-0.361,0.1-0.882,0.262-1.517,0.46c-5.588,1.74-11.76,3.45-14.293,1.695  c-0.686-0.477-1.075-1.183-1.125-2.045c-0.027-0.472,0.334-0.877,0.807-0.904c0.477-0.003,0.877,0.333,0.905,0.807  c0.019,0.338,0.135,0.558,0.39,0.733c2.059,1.427,9.867-1.007,12.807-1.923c0.658-0.205,1.197-0.373,1.57-0.477l0.398-0.111  c3.681-1.042,7.323-1.816,9.035-0.47c1.507,1.19,0.712,3,0.187,4.197c-0.019,0.042-0.035,0.082-0.054,0.122  c1.835-0.261,3.836-0.884,5.784-1.49c1.845-0.572,3.752-1.166,5.522-1.453l0.197-0.032c2.164-0.353,5.434-0.884,7.432,0.152  c1.737,0.898,2.13,2.892,2.475,4.65c0.262,1.333,0.51,2.594,1.245,2.973c0.645,0.331,1.842,0.108,3.466-0.633  c0.431-0.198,0.938-0.01,1.135,0.423s0.007,0.939-0.423,1.136C78.913,90.05,77.782,90.36,76.843,90.36z"></path><path xmlns="http://www.w3.org/2000/svg" d="M33.647,60.737c-2.915-0.959-5.222-2.576-6.443-4.288c-6.1,13.144-8.838,23.231-6.269,24.664  c2.661,1.484,10.229-6.766,18.546-19.611C37.76,61.658,35.726,61.42,33.647,60.737z"></path><path xmlns="http://www.w3.org/2000/svg" d="M60.113,10.875c-3.425-1.91-9.332,2.159-13.195,9.086L31.771,47.119l0.053,0.029c-1.549,2.932-2.961,5.777-4.244,8.508  c1.598,1.378,3.888,2.653,6.576,3.537c2.167,0.713,4.274,1.065,6.114,1.093c1.272-1.998,2.558-4.096,3.844-6.282l0.052,0.029  l15.149-27.158C63.179,19.948,63.535,12.785,60.113,10.875z"></path></g><g id="SvgjsG6776" featurekey="VGK2BT-0" transform="matrix(4.721794933808366,0,0,4.721794933808366,137.84357321442036,-6.216608163753829)" fill="#000000"><path d="M2.8476 17.9011 l2.1524 0 l0 -9.7727 l-2.7005 0 l0.54813 0.41444 l0 9.3583 z M6.8449 7.34 l0 11.35 c0 0.74866 -0.58824 1.3235 -1.3369 1.3235 l-4.5053 0 l0 -2.1123 l0 -11.471 l-0.33422 -0.41444 l4.8396 0 c0.73529 0 1.3369 0.61497 1.3369 1.3235 z M9.746026737967915 15.8021 l1.885 0 l-0.93583 -7.6738 z M7.379676737967914 20.026738 l1.6711 -13.596 l-0.33422 -0.40107 l3.5695 0 l1.7246 13.997 l-1.8583 0 l-0.25401 -2.1123 l-2.9545 -0.013369 l0.49465 0.3877 l-0.2139 1.738 l-1.8449 0 z M16.497363636363634 19.973262 l-1.8449 0 l0 -13.583 l-0.33422 -0.41444 l2.1791 0 l0 13.997 z M17.21924893048128 6.016 l2.1791 0 l0 11.885 l3.0749 0 l0 2.1123 l-4.9198 0 l0 -0.013369 l0 -2.0989 l0 -11.484 z M20.240640160427805 6.003 l2.139 0 l1.484 5.9358 l1.4706 -5.9358 l1.8984 0 l-2.4332 9.7326 l-0.026738 0.12032 l0 4.1578 l-1.8316 0 l0 -4.1711 l-0.026738 -0.10695 l-2.3262 -9.3182 z M29.86635133689839 11.9251 l2.1524 0 l0 -3.8369 l-2.7005 0 l0.54813 0.41444 l0 3.4225 z M33.850251336898395 7.313000000000001 l0 5.4011 c0 0.70856 -0.57487 1.3235 -1.3235 1.3235 l-3.2086 0 l0.54813 0.41444 l0 5.5348 l-1.8449 0 l0 -13.596 l-0.33422 -0.41444 l4.8396 0 c0.74866 0 1.3235 0.58824 1.3235 1.3369 z M36.149708021390374 17.9011 l2.1524 0 l0 -11.898 l1.8449 0 l0 12.674 c0 0.74866 -0.61497 1.3235 -1.3235 1.3235 l-3.1818 0.013369 c-0.74866 0 -1.3235 -0.58824 -1.3235 -1.3369 l0 -12.259 l-0.013369 0 l-0.33422 -0.41444 l2.1791 0 l0 11.898 z M40.85561256684492 6.016 l2.1791 0 l0 11.885 l3.0749 0 l0 2.1123 l-4.9198 0 l0 -0.013369 l0 -2.0989 l0 -11.484 z M52.098935294117645 7.34 l0 2.8877 l-1.8316 0 l0 -2.1123 l-2.7005 0 l0.53476 0.41444 l0 1.6979 l3.9973 4.9064 l0 2.1123 l0 1.4439 c0 0.70856 -0.57487 1.3235 -1.3235 1.3235 l-3.1818 0 c-0.74866 0 -1.3235 -0.61497 -1.3235 -1.3235 l0 -2.9813 l1.8316 0 l0 2.1925 l2.1658 0 l0 -2.1123 l-3.9973 -4.9064 l0 -3.5428 c0 -0.74866 0.57487 -1.3235 1.3235 -1.3235 l3.1818 0 c0.74866 0 1.3235 0.57487 1.3235 1.3235 z M52.76737775401069 6.43 l-0.33422 -0.41444 l5.254 0 l0 2.1123 l-3.623 0 l0.54813 0.41444 l0 3.4091 l2.1658 0 l0 2.1257 l-2.7139 0 l0.54813 0.40107 l0 3.4225 l3.0749 0 l0 2.1123 l-4.9198 0 l0 -2.1123 l0 -3.8235 l0 -2.1257 l0 -5.5214 z"></path></g><g id="SvgjsG6777" featurekey="sloganFeature-0" transform="matrix(1.3081888608549008,0,0,1.3081888608549008,139.6918111391451,98.52871294683119)" fill="#000000"><path d="M1.26 20 c-0.16 0 -0.26 -0.12 -0.26 -0.26 l0 -11.98 c0 -0.14 0.1 -0.26 0.26 -0.26 l4.54 0 c1.2 0 2.3 0.26 3.26 0.8 c0.96 0.52 1.7 1.26 2.24 2.22 c0.52 0.94 0.8 2.02 0.8 3.22 c0 1.22 -0.28 2.3 -0.82 3.24 c-0.54 0.96 -1.3 1.7 -2.28 2.22 c-0.96 0.54 -2.08 0.8 -3.3 0.8 l-4.44 0 z M4.1 17.2 l1.76 0 c0.58 0 1.12 -0.14 1.58 -0.42 c0.46 -0.3 0.84 -0.7 1.1 -1.22 s0.4 -1.12 0.4 -1.8 c0 -0.66 -0.14 -1.28 -0.42 -1.8 c-0.28 -0.54 -0.66 -0.94 -1.14 -1.24 c-0.48 -0.28 -1.04 -0.44 -1.64 -0.44 l-1.64 0 l0 6.92 z M22.541000000000004 20 c-0.08 0 -0.16 -0.04 -0.2 -0.12 c-0.06 -0.06 -0.06 -0.16 -0.04 -0.24 l4.66 -11.98 c0.04 -0.1 0.14 -0.16 0.24 -0.16 l2.68 0 c0.1 0 0.2 0.06 0.24 0.16 l4.58 11.98 c0.02 0.08 0.02 0.16 -0.04 0.24 c-0.04 0.08 -0.12 0.12 -0.2 0.12 l-2.78 0 c-0.1 0 -0.2 -0.06 -0.24 -0.16 l-0.74 -1.84 l-4.5 0.02 l-0.74 1.82 c-0.04 0.1 -0.14 0.16 -0.24 0.16 l-2.68 0 z M27.021 15.5 l2.88 0 l-1.44 -4.24 z M46.362 20 c-0.14 0 -0.26 -0.12 -0.26 -0.26 l0 -11.98 c0 -0.14 0.12 -0.26 0.26 -0.26 l2.6 0 c0.14 0 0.26 0.12 0.26 0.26 l0 11.98 c0 0.14 -0.12 0.26 -0.26 0.26 l-2.6 0 z M61.063 20 c-0.14 0 -0.26 -0.12 -0.26 -0.26 l0 -11.98 c0 -0.14 0.12 -0.26 0.26 -0.26 l2.6 0 c0.14 0 0.26 0.12 0.26 0.26 l0 9.36 l4.5 0 c0.14 0 0.26 0.12 0.26 0.26 l0 2.36 c0 0.14 -0.12 0.26 -0.26 0.26 l-7.36 0 z M83.16400000000002 20 c-0.14 0 -0.24 -0.12 -0.24 -0.26 l0 -4.76 l-4.24 -7.1 c-0.04 -0.08 -0.04 -0.18 0.02 -0.26 c0.04 -0.08 0.12 -0.12 0.22 -0.12 l2.6 0 c0.1 0 0.18 0.04 0.22 0.14 l2.72 4.44 l2.66 -4.44 c0.04 -0.08 0.12 -0.14 0.22 -0.14 l2.62 0 c0.08 0 0.18 0.04 0.22 0.12 s0.04 0.18 0 0.26 l-4.16 7.02 l0 4.84 c0 0.14 -0.12 0.26 -0.26 0.26 l-2.6 0 z M121.02600000000002 20 c-0.1 0 -0.2 -0.06 -0.24 -0.16 l-4 -12 c-0.04 -0.08 -0.02 -0.16 0.02 -0.24 c0.06 -0.06 0.14 -0.1 0.22 -0.1 l2.8 0 c0.1 0 0.2 0.06 0.24 0.18 l2.38 7.82 l2.4 -7.82 c0.04 -0.12 0.14 -0.18 0.24 -0.18 l2.68 0 c0.08 0 0.16 0.04 0.22 0.1 c0.04 0.08 0.06 0.16 0.02 0.24 l-4.06 12 c-0.04 0.1 -0.12 0.16 -0.24 0.16 l-2.68 0 z M139.86700000000002 20 c-0.14 0 -0.26 -0.12 -0.26 -0.26 l0 -11.98 c0 -0.14 0.12 -0.26 0.26 -0.26 l2.6 0 c0.14 0 0.26 0.12 0.26 0.26 l0 11.98 c0 0.14 -0.12 0.26 -0.26 0.26 l-2.6 0 z M154.568 20 c-0.14 0 -0.26 -0.12 -0.26 -0.26 l0 -11.98 c0 -0.14 0.12 -0.26 0.26 -0.26 l4.78 0 c1.32 0 2.2 0.28 2.98 0.86 c1.08 0.78 1.52 2.26 1.02 3.52 c-0.26 0.64 -0.7 0.98 -1.3 1.3 c0.86 0.12 1.4 0.68 1.72 1.08 c0.46 0.6 0.7 1.32 0.7 2.16 c0 1.1 -0.44 2 -1.28 2.64 c-0.82 0.62 -1.94 0.94 -3.32 0.94 l-5.3 0 z M157.24800000000002 12.08 l1.96 0 c0.4 0 0.72 -0.08 0.94 -0.26 c0.2 -0.18 0.3 -0.42 0.3 -0.74 c0 -0.3 -0.1 -0.54 -0.3 -0.7 c-0.2 -0.18 -0.5 -0.26 -0.86 -0.26 l-2.04 0 l0 1.96 z M157.24800000000002 17.54 l2.34 0 c0.6 0 1.06 -0.12 1.4 -0.36 c0.3 -0.22 0.46 -0.52 0.46 -0.94 c0 -0.38 -0.16 -0.66 -0.46 -0.88 c-0.32 -0.22 -0.76 -0.34 -1.32 -0.34 l-2.42 0 l0 2.52 z M176.04900000000004 20 l0 -11.98 c0 -0.5 0.1 -0.6 0.26 -0.6 l8.76 0 c0.14 0 0.26 0.1 0.26 0.24 l0 2.26 c0 0.14 -0.12 0.26 -0.26 0.26 l-5.92 0 l0 2.08 l3.74 0 c0.14 0 0.26 0.12 0.26 0.26 l0 2.24 c0 0.14 -0.12 0.26 -0.26 0.26 l-3.74 0 l0 2.14 l5.9 0 c0.14 0 0.26 0.12 0.26 0.26 l0 2.24 c0 0.14 -0.12 0.26 -0.26 0.26 l-8.74 0 c-0.16 0 -0.26 -0.12 -0.26 0.08 z M202.25000000000003 20.12 c-0.96 0 -1.92 -0.18 -2.84 -0.54 c-0.92 -0.34 -1.74 -0.84 -2.42 -1.44 c-0.08 -0.08 -0.1 -0.2 -0.06 -0.3 l0.7 -2.38 c0.04 -0.08 0.1 -0.14 0.18 -0.14 c0.08 -0.02 0.16 0 0.22 0.06 c1.06 1 2.26 1.9 3.76 1.98 c0.4 0.02 0.84 0.04 1.22 -0.08 c1.18 -0.38 0.68 -1.58 -0.2 -1.94 c-0.3 -0.12 -0.72 -0.26 -1.26 -0.42 c-0.8 -0.22 -1.46 -0.46 -1.96 -0.7 c-0.54 -0.24 -1 -0.62 -1.4 -1.12 c-0.38 -0.52 -0.58 -1.2 -0.58 -2.02 c0 -0.78 0.2 -1.46 0.6 -2.04 s0.96 -1.04 1.66 -1.34 s1.52 -0.46 2.44 -0.46 c0.82 0 1.62 0.12 2.42 0.38 c0.78 0.24 1.48 0.58 2.1 0.98 c0.1 0.08 0.14 0.2 0.08 0.32 l-0.66 2.24 c-0.02 0.08 -0.08 0.12 -0.16 0.14 c-0.06 0.02 -0.14 0.02 -0.2 -0.02 c-0.9 -0.56 -1.8 -1.24 -2.86 -1.38 c-0.7 -0.1 -1.76 -0.06 -2 0.78 c-0.3 1.08 1.28 1.36 2 1.58 c0.8 0.24 1.46 0.48 1.98 0.72 c0.54 0.26 1.02 0.66 1.4 1.16 c0.4 0.52 0.6 1.22 0.6 2.06 c0 0.82 -0.22 1.52 -0.64 2.12 c-0.4 0.6 -0.98 1.04 -1.7 1.36 c-0.72 0.28 -1.52 0.44 -2.42 0.44 z"></path></g></svg>
        </Link>
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
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
        </ul>
        <div className='flex'>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <div className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"><SignInButton
              mode='modal'
              appearance={{
                elements: {
                  footer: { display: 'none' }, // Hide the branding footer
                },
              }}
            >
              Sign In
            </SignInButton></div>
            <div className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"> <SignUpButton
              mode='modal'
              appearance={{
                elements: {
                  footer: { display: 'none' }, // Hide the branding footer
                },
              }}
            >
              Sign up
            </SignUpButton></div>
          </SignedOut>
          <div className="lg:hidden">
            <button className="navbar-burger flex items-center text-blue-600 p-3" onClick={() => setisOpen(!isOpen)}>
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
      </nav>
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav className="fixed top-0 z-10 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <Link className="mr-auto text-3xl font-bold leading-none" href="/">
              <svg width="179.99999999999997" height="64.01948842874543" viewBox="0 0 410.49999999999994 146" class="looka-1j8o68f"><defs id="SvgjsDefs6773"></defs><g id="SvgjsG6774" featurekey="symbolGroupContainer" transform="matrix(1,0,0,1,0,0)" fill="#3b82f6"><rect xmlns="http://www.w3.org/2000/svg" width="121" height="146" rx="10" ry="10"></rect></g><g id="SvgjsG6775" featurekey="odWo6G-0" transform="matrix(1.3279798873944544,0,0,1.3279798873944544,-6.523351653779333,6.183964099801532)" fill="#ffffff"><path xmlns="http://www.w3.org/2000/svg" d="M63.738,11.716c-1.346-0.751-3.007-0.715-4.748-0.038c0.704,0.035,1.369,0.21,1.969,0.545  c3.614,2.016,3.597,8.938-0.041,15.459c-0.668,1.198-1.337,2.395-2.004,3.593c-1.269,2.274-3.193,4.725-4.067,7.161  c-0.211,0.587-0.81,2.75-0.689,3.273c0.458,1.991,4.407-5.333,4.681-5.824c1.62-2.903,3.24-5.807,4.858-8.71  C67.334,20.653,67.352,13.731,63.738,11.716z"></path><path xmlns="http://www.w3.org/2000/svg" d="M76.843,90.36c-0.569,0-1.07-0.114-1.513-0.341c-1.473-0.758-1.814-2.49-2.144-4.168c-0.296-1.511-0.576-2.938-1.579-3.457  c-1.5-0.775-4.547-0.281-6.369,0.018l-0.198,0.032c-1.651,0.269-3.417,0.817-5.287,1.399c-2.51,0.779-5.103,1.586-7.479,1.683  l-0.966,0.039l0.076-0.962c0.043-0.545,0.293-1.114,0.559-1.72c0.545-1.239,0.72-1.847,0.321-2.161  c-0.835-0.66-3.362-0.4-7.505,0.772L44.35,81.61c-0.361,0.1-0.882,0.262-1.517,0.46c-5.588,1.74-11.76,3.45-14.293,1.695  c-0.686-0.477-1.075-1.183-1.125-2.045c-0.027-0.472,0.334-0.877,0.807-0.904c0.477-0.003,0.877,0.333,0.905,0.807  c0.019,0.338,0.135,0.558,0.39,0.733c2.059,1.427,9.867-1.007,12.807-1.923c0.658-0.205,1.197-0.373,1.57-0.477l0.398-0.111  c3.681-1.042,7.323-1.816,9.035-0.47c1.507,1.19,0.712,3,0.187,4.197c-0.019,0.042-0.035,0.082-0.054,0.122  c1.835-0.261,3.836-0.884,5.784-1.49c1.845-0.572,3.752-1.166,5.522-1.453l0.197-0.032c2.164-0.353,5.434-0.884,7.432,0.152  c1.737,0.898,2.13,2.892,2.475,4.65c0.262,1.333,0.51,2.594,1.245,2.973c0.645,0.331,1.842,0.108,3.466-0.633  c0.431-0.198,0.938-0.01,1.135,0.423s0.007,0.939-0.423,1.136C78.913,90.05,77.782,90.36,76.843,90.36z"></path><path xmlns="http://www.w3.org/2000/svg" d="M33.647,60.737c-2.915-0.959-5.222-2.576-6.443-4.288c-6.1,13.144-8.838,23.231-6.269,24.664  c2.661,1.484,10.229-6.766,18.546-19.611C37.76,61.658,35.726,61.42,33.647,60.737z"></path><path xmlns="http://www.w3.org/2000/svg" d="M60.113,10.875c-3.425-1.91-9.332,2.159-13.195,9.086L31.771,47.119l0.053,0.029c-1.549,2.932-2.961,5.777-4.244,8.508  c1.598,1.378,3.888,2.653,6.576,3.537c2.167,0.713,4.274,1.065,6.114,1.093c1.272-1.998,2.558-4.096,3.844-6.282l0.052,0.029  l15.149-27.158C63.179,19.948,63.535,12.785,60.113,10.875z"></path></g><g id="SvgjsG6776" featurekey="VGK2BT-0" transform="matrix(4.721794933808366,0,0,4.721794933808366,137.84357321442036,-6.216608163753829)" fill="#000000"><path d="M2.8476 17.9011 l2.1524 0 l0 -9.7727 l-2.7005 0 l0.54813 0.41444 l0 9.3583 z M6.8449 7.34 l0 11.35 c0 0.74866 -0.58824 1.3235 -1.3369 1.3235 l-4.5053 0 l0 -2.1123 l0 -11.471 l-0.33422 -0.41444 l4.8396 0 c0.73529 0 1.3369 0.61497 1.3369 1.3235 z M9.746026737967915 15.8021 l1.885 0 l-0.93583 -7.6738 z M7.379676737967914 20.026738 l1.6711 -13.596 l-0.33422 -0.40107 l3.5695 0 l1.7246 13.997 l-1.8583 0 l-0.25401 -2.1123 l-2.9545 -0.013369 l0.49465 0.3877 l-0.2139 1.738 l-1.8449 0 z M16.497363636363634 19.973262 l-1.8449 0 l0 -13.583 l-0.33422 -0.41444 l2.1791 0 l0 13.997 z M17.21924893048128 6.016 l2.1791 0 l0 11.885 l3.0749 0 l0 2.1123 l-4.9198 0 l0 -0.013369 l0 -2.0989 l0 -11.484 z M20.240640160427805 6.003 l2.139 0 l1.484 5.9358 l1.4706 -5.9358 l1.8984 0 l-2.4332 9.7326 l-0.026738 0.12032 l0 4.1578 l-1.8316 0 l0 -4.1711 l-0.026738 -0.10695 l-2.3262 -9.3182 z M29.86635133689839 11.9251 l2.1524 0 l0 -3.8369 l-2.7005 0 l0.54813 0.41444 l0 3.4225 z M33.850251336898395 7.313000000000001 l0 5.4011 c0 0.70856 -0.57487 1.3235 -1.3235 1.3235 l-3.2086 0 l0.54813 0.41444 l0 5.5348 l-1.8449 0 l0 -13.596 l-0.33422 -0.41444 l4.8396 0 c0.74866 0 1.3235 0.58824 1.3235 1.3369 z M36.149708021390374 17.9011 l2.1524 0 l0 -11.898 l1.8449 0 l0 12.674 c0 0.74866 -0.61497 1.3235 -1.3235 1.3235 l-3.1818 0.013369 c-0.74866 0 -1.3235 -0.58824 -1.3235 -1.3369 l0 -12.259 l-0.013369 0 l-0.33422 -0.41444 l2.1791 0 l0 11.898 z M40.85561256684492 6.016 l2.1791 0 l0 11.885 l3.0749 0 l0 2.1123 l-4.9198 0 l0 -0.013369 l0 -2.0989 l0 -11.484 z M52.098935294117645 7.34 l0 2.8877 l-1.8316 0 l0 -2.1123 l-2.7005 0 l0.53476 0.41444 l0 1.6979 l3.9973 4.9064 l0 2.1123 l0 1.4439 c0 0.70856 -0.57487 1.3235 -1.3235 1.3235 l-3.1818 0 c-0.74866 0 -1.3235 -0.61497 -1.3235 -1.3235 l0 -2.9813 l1.8316 0 l0 2.1925 l2.1658 0 l0 -2.1123 l-3.9973 -4.9064 l0 -3.5428 c0 -0.74866 0.57487 -1.3235 1.3235 -1.3235 l3.1818 0 c0.74866 0 1.3235 0.57487 1.3235 1.3235 z M52.76737775401069 6.43 l-0.33422 -0.41444 l5.254 0 l0 2.1123 l-3.623 0 l0.54813 0.41444 l0 3.4091 l2.1658 0 l0 2.1257 l-2.7139 0 l0.54813 0.40107 l0 3.4225 l3.0749 0 l0 2.1123 l-4.9198 0 l0 -2.1123 l0 -3.8235 l0 -2.1257 l0 -5.5214 z"></path></g><g id="SvgjsG6777" featurekey="sloganFeature-0" transform="matrix(1.3081888608549008,0,0,1.3081888608549008,139.6918111391451,98.52871294683119)" fill="#000000"><path d="M1.26 20 c-0.16 0 -0.26 -0.12 -0.26 -0.26 l0 -11.98 c0 -0.14 0.1 -0.26 0.26 -0.26 l4.54 0 c1.2 0 2.3 0.26 3.26 0.8 c0.96 0.52 1.7 1.26 2.24 2.22 c0.52 0.94 0.8 2.02 0.8 3.22 c0 1.22 -0.28 2.3 -0.82 3.24 c-0.54 0.96 -1.3 1.7 -2.28 2.22 c-0.96 0.54 -2.08 0.8 -3.3 0.8 l-4.44 0 z M4.1 17.2 l1.76 0 c0.58 0 1.12 -0.14 1.58 -0.42 c0.46 -0.3 0.84 -0.7 1.1 -1.22 s0.4 -1.12 0.4 -1.8 c0 -0.66 -0.14 -1.28 -0.42 -1.8 c-0.28 -0.54 -0.66 -0.94 -1.14 -1.24 c-0.48 -0.28 -1.04 -0.44 -1.64 -0.44 l-1.64 0 l0 6.92 z M22.541000000000004 20 c-0.08 0 -0.16 -0.04 -0.2 -0.12 c-0.06 -0.06 -0.06 -0.16 -0.04 -0.24 l4.66 -11.98 c0.04 -0.1 0.14 -0.16 0.24 -0.16 l2.68 0 c0.1 0 0.2 0.06 0.24 0.16 l4.58 11.98 c0.02 0.08 0.02 0.16 -0.04 0.24 c-0.04 0.08 -0.12 0.12 -0.2 0.12 l-2.78 0 c-0.1 0 -0.2 -0.06 -0.24 -0.16 l-0.74 -1.84 l-4.5 0.02 l-0.74 1.82 c-0.04 0.1 -0.14 0.16 -0.24 0.16 l-2.68 0 z M27.021 15.5 l2.88 0 l-1.44 -4.24 z M46.362 20 c-0.14 0 -0.26 -0.12 -0.26 -0.26 l0 -11.98 c0 -0.14 0.12 -0.26 0.26 -0.26 l2.6 0 c0.14 0 0.26 0.12 0.26 0.26 l0 11.98 c0 0.14 -0.12 0.26 -0.26 0.26 l-2.6 0 z M61.063 20 c-0.14 0 -0.26 -0.12 -0.26 -0.26 l0 -11.98 c0 -0.14 0.12 -0.26 0.26 -0.26 l2.6 0 c0.14 0 0.26 0.12 0.26 0.26 l0 9.36 l4.5 0 c0.14 0 0.26 0.12 0.26 0.26 l0 2.36 c0 0.14 -0.12 0.26 -0.26 0.26 l-7.36 0 z M83.16400000000002 20 c-0.14 0 -0.24 -0.12 -0.24 -0.26 l0 -4.76 l-4.24 -7.1 c-0.04 -0.08 -0.04 -0.18 0.02 -0.26 c0.04 -0.08 0.12 -0.12 0.22 -0.12 l2.6 0 c0.1 0 0.18 0.04 0.22 0.14 l2.72 4.44 l2.66 -4.44 c0.04 -0.08 0.12 -0.14 0.22 -0.14 l2.62 0 c0.08 0 0.18 0.04 0.22 0.12 s0.04 0.18 0 0.26 l-4.16 7.02 l0 4.84 c0 0.14 -0.12 0.26 -0.26 0.26 l-2.6 0 z M121.02600000000002 20 c-0.1 0 -0.2 -0.06 -0.24 -0.16 l-4 -12 c-0.04 -0.08 -0.02 -0.16 0.02 -0.24 c0.06 -0.06 0.14 -0.1 0.22 -0.1 l2.8 0 c0.1 0 0.2 0.06 0.24 0.18 l2.38 7.82 l2.4 -7.82 c0.04 -0.12 0.14 -0.18 0.24 -0.18 l2.68 0 c0.08 0 0.16 0.04 0.22 0.1 c0.04 0.08 0.06 0.16 0.02 0.24 l-4.06 12 c-0.04 0.1 -0.12 0.16 -0.24 0.16 l-2.68 0 z M139.86700000000002 20 c-0.14 0 -0.26 -0.12 -0.26 -0.26 l0 -11.98 c0 -0.14 0.12 -0.26 0.26 -0.26 l2.6 0 c0.14 0 0.26 0.12 0.26 0.26 l0 11.98 c0 0.14 -0.12 0.26 -0.26 0.26 l-2.6 0 z M154.568 20 c-0.14 0 -0.26 -0.12 -0.26 -0.26 l0 -11.98 c0 -0.14 0.12 -0.26 0.26 -0.26 l4.78 0 c1.32 0 2.2 0.28 2.98 0.86 c1.08 0.78 1.52 2.26 1.02 3.52 c-0.26 0.64 -0.7 0.98 -1.3 1.3 c0.86 0.12 1.4 0.68 1.72 1.08 c0.46 0.6 0.7 1.32 0.7 2.16 c0 1.1 -0.44 2 -1.28 2.64 c-0.82 0.62 -1.94 0.94 -3.32 0.94 l-5.3 0 z M157.24800000000002 12.08 l1.96 0 c0.4 0 0.72 -0.08 0.94 -0.26 c0.2 -0.18 0.3 -0.42 0.3 -0.74 c0 -0.3 -0.1 -0.54 -0.3 -0.7 c-0.2 -0.18 -0.5 -0.26 -0.86 -0.26 l-2.04 0 l0 1.96 z M157.24800000000002 17.54 l2.34 0 c0.6 0 1.06 -0.12 1.4 -0.36 c0.3 -0.22 0.46 -0.52 0.46 -0.94 c0 -0.38 -0.16 -0.66 -0.46 -0.88 c-0.32 -0.22 -0.76 -0.34 -1.32 -0.34 l-2.42 0 l0 2.52 z M176.04900000000004 20 l0 -11.98 c0 -0.5 0.1 -0.6 0.26 -0.6 l8.76 0 c0.14 0 0.26 0.1 0.26 0.24 l0 2.26 c0 0.14 -0.12 0.26 -0.26 0.26 l-5.92 0 l0 2.08 l3.74 0 c0.14 0 0.26 0.12 0.26 0.26 l0 2.24 c0 0.14 -0.12 0.26 -0.26 0.26 l-3.74 0 l0 2.14 l5.9 0 c0.14 0 0.26 0.12 0.26 0.26 l0 2.24 c0 0.14 -0.12 0.26 -0.26 0.26 l-8.74 0 c-0.16 0 -0.26 -0.12 -0.26 0.08 z M202.25000000000003 20.12 c-0.96 0 -1.92 -0.18 -2.84 -0.54 c-0.92 -0.34 -1.74 -0.84 -2.42 -1.44 c-0.08 -0.08 -0.1 -0.2 -0.06 -0.3 l0.7 -2.38 c0.04 -0.08 0.1 -0.14 0.18 -0.14 c0.08 -0.02 0.16 0 0.22 0.06 c1.06 1 2.26 1.9 3.76 1.98 c0.4 0.02 0.84 0.04 1.22 -0.08 c1.18 -0.38 0.68 -1.58 -0.2 -1.94 c-0.3 -0.12 -0.72 -0.26 -1.26 -0.42 c-0.8 -0.22 -1.46 -0.46 -1.96 -0.7 c-0.54 -0.24 -1 -0.62 -1.4 -1.12 c-0.38 -0.52 -0.58 -1.2 -0.58 -2.02 c0 -0.78 0.2 -1.46 0.6 -2.04 s0.96 -1.04 1.66 -1.34 s1.52 -0.46 2.44 -0.46 c0.82 0 1.62 0.12 2.42 0.38 c0.78 0.24 1.48 0.58 2.1 0.98 c0.1 0.08 0.14 0.2 0.08 0.32 l-0.66 2.24 c-0.02 0.08 -0.08 0.12 -0.16 0.14 c-0.06 0.02 -0.14 0.02 -0.2 -0.02 c-0.9 -0.56 -1.8 -1.24 -2.86 -1.38 c-0.7 -0.1 -1.76 -0.06 -2 0.78 c-0.3 1.08 1.28 1.36 2 1.58 c0.8 0.24 1.46 0.48 1.98 0.72 c0.54 0.26 1.02 0.66 1.4 1.16 c0.4 0.52 0.6 1.22 0.6 2.06 c0 0.82 -0.22 1.52 -0.64 2.12 c-0.4 0.6 -0.98 1.04 -1.7 1.36 c-0.72 0.28 -1.52 0.44 -2.42 0.44 z"></path></g></svg>
            </Link>
            <button className="navbar-close" onClick={() => setisOpen(false)}>
              <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
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
                <div className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl"><SignInButton mode='modal'>Sign in</SignInButton></div>
                <div className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl"><SignUpButton mode='modal'>Sign Up</SignUpButton></div>
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
