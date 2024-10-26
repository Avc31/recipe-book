"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CiUser } from "react-icons/ci";
import { RiAccountCircleLine } from "react-icons/ri";
import Router from 'next/router';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ value: token })
      setKey(Math.random())
    }
  }, [])


  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setDropdown(prev => !prev);
  };


  const logout = () => {
    localStorage.removeItem("token")
    setUser({ value: null })
    setKey(Math.random())
    setDropdown(prev => !prev);
  }

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold">Recipe Book</Link>
        {/* <Image></Image> */}

        <ul className={`md:flex md:items-center md:space-x-4 ${isOpen ? 'flex' : 'hidden'} flex-col md:flex-row`}>
          <li className="my-2 md:my-0">
            <Link href="/" className="block px-4 py-2 hover:bg-gray-700 rounded">Home</Link>
          </li>
          <li className="my-2 md:my-0">
            <Link href="/recipes" className="block px-4 py-2 hover:bg-gray-700 rounded">Recipes</Link>
          </li>
          <li className="my-2 md:my-0">
            <Link href="/addrecipe" className="block px-4 py-2 hover:bg-gray-700 rounded">Add recipe</Link>
          </li>
          <li className="my-2 md:my-0">
            <Link href="/yourrecipes" className="block px-4 py-2 hover:bg-gray-700 rounded">Your recipes</Link>
          </li>
          <li className="my-2 md:my-0">
            <Link href="/about" className="block px-4 py-2 hover:bg-gray-700 rounded">About</Link>
          </li>
        </ul>


        {dropdown &&
          <div className="absolute right-12 bg-gray-500 top-12 py-4 rounded-md px-5 w-32">
            <ul>
            <Link href="/myaccount"><li className="py-1 hover:text-black text-sm">My Account</li></Link>
            <Link href="/yourrecipes"><li className="py-1 hover:text-black text-sm">My Recipes</li></Link>
              <a onClick={logout}><li className="py-1 hover:text-black text-sm">LogOut</li></a>
            </ul>
          </div>
        }
        {user.value && <RiAccountCircleLine onClick={toggleDropdown} className="text-2xl" />}
        {!user.value && (
          <Link href="/login" className="text-1xl font-bold">Log in</Link>
        )}
        <div className="md:hidden flex items-center" onClick={toggleMenu}>
          <button className="focus:outline-none">
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>

  );
}

