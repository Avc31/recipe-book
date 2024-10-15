"use client"; // to ensure it's a client component

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold">
          Recipe Book
        </Link>
        <div className="md:hidden flex items-center" onClick={toggleMenu}>
          <button className="focus:outline-none">
            {/* Hamburger Icon */}
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
        <ul className={`md:flex md:items-center md:space-x-4 ${isOpen ? 'flex' : 'hidden'} flex-col md:flex-row`}>
          <li className="my-2 md:my-0">
            <Link href="/" className="block px-4 py-2 hover:bg-gray-700 rounded">
              Home
            </Link>
          </li>
          <li className="my-2 md:my-0">
            <Link href="/recipes" className="block px-4 py-2 hover:bg-gray-700 rounded">
              Recipes
            </Link>
          </li>
          <li className="my-2 md:my-0">
            <Link href="/about" className="block px-4 py-2 hover:bg-gray-700 rounded">
              About
            </Link>
          </li>
          <li className="my-2 md:my-0">
            <Link href="/addrecipe" className="block px-4 py-2 hover:bg-gray-700 rounded">
              Add recipe
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

