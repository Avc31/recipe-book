"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { RiAccountCircleLine } from "react-icons/ri";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({ value: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ value: token });
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };


  const logout = () => {
    localStorage.removeItem("token");
    setUser({ value: null });
    window.location.href = '/';
  };

  return (
    <nav className="bg-yellow-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-1">
      
        <Link href="/" className="text-2xl font-bold flex justify-between items-center "><img src="../icon.png" alt="Logo" width="55" height="55" className="d-inline-block align-text-top m-2" />RecipeBook</Link>

        <div className="hidden md:flex md:items-center md:space-x-4">
          <Link href="/" className="px-4 py-2 hover:bg-yellow-700 rounded">Home</Link>
          <Link href="/recipes" className="px-4 py-2 hover:bg-yellow-700 rounded">Recipes</Link>
          <Link href="/addrecipe" className="px-4 py-2 hover:bg-yellow-700 rounded">Add Recipe</Link>
          <Link href="/yourrecipes" className="px-4 py-2 hover:bg-yellow-700 rounded">Your Recipes</Link>
          <Link href="/about" className="px-4 py-2 hover:bg-yellow-700 rounded">About</Link>
        </div>

        {/* Dropdown for Account */}
        {user.value && (
          <div className="relative group">
            <RiAccountCircleLine className="text-2xl cursor-pointer" />
            <div className="absolute right-0 bg-yellow-700 py-2 rounded-md w-32 shadow-lg  opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-opacity duration-200">
              <ul>
                <Link href="/myaccount"><li className="py-1 px-4 hover:text-black text-sm">My Account</li></Link>
                <Link href="/yourrecipes"><li className="py-1 px-4 hover:text-black text-sm">My Recipes</li></Link>
                <Link href="/favorites"><li className="py-1 px-4 hover:text-black text-sm">Favorites</li></Link>
                <li onClick={logout} className="py-1 px-4 hover:text-black text-sm cursor-pointer">LogOut</li>
              </ul>
            </div>
          </div>
        )}


        {!user.value && (
          <Link href="/login" className="text-xl font-bold">Log in</Link>
        )}

        {/* Mobile Menu Button */}
        <button className="md:hidden flex items-center" onClick={toggleMenu}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Side Panel Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-yellow-800 text-white transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 focus:outline-none text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <ul className="flex flex-col mt-16 space-y-4 text-lg font-semibold px-6">
          <Link href="/" onClick={toggleMenu}><li className="hover:bg-yellow-700 p-2 rounded">Home</li></Link>
          <Link href="/recipes" onClick={toggleMenu}><li className="hover:bg-yellow-700 p-2 rounded">Recipes</li></Link>
          <Link href="/addrecipe" onClick={toggleMenu}><li className="hover:bg-yellow-700 p-2 rounded">Add Recipe</li></Link>
          <Link href="/yourrecipes" onClick={toggleMenu}><li className="hover:bg-yellow-700 p-2 rounded">Your Recipes</li></Link>
          <Link href="/about" onClick={toggleMenu}><li className="hover:bg-yellow-700 p-2 rounded">About</li></Link>
          {!user.value && <Link href="/login" onClick={toggleMenu}><li className="hover:bg-yellow-700 p-2 rounded">Log In</li></Link>}
          {user.value && <li onClick={logout} className="hover:bg-yellow-700 p-2 rounded cursor-pointer">Logout</li>}
        </ul>
      </div>
    </nav>
  );
}
