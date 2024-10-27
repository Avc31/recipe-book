"use client";

import React from 'react'
import { useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";
import { useRouter } from 'next/navigation';
import LoadingIcons from 'react-loading-icons';

const Addrecipe = () => {

  const router = useRouter();
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [fullRecipe, setfullRecipe] = useState("")
  const [imgurl, setImgurl] = useState("")
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [userName, setuserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        // if (!token) throw new Error("No token found");

        if (!token) {
          router.push('/login');
          return;
        }

        const decodedToken = jwtDecode(token);
        const loggedInUserEmail = decodedToken.email;

        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        const currentUser = data.users.find(user => user.email === loggedInUserEmail);
        if (currentUser) {
          setUser(currentUser);
          setuserName(currentUser.name)
        } else {
          throw new Error("User not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {

      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    if (e.target.name == 'title') {
      setTitle(e.target.value)
    } else if (e.target.name == 'description') {
      setDescription(e.target.value)
    } else if (e.target.name == 'fullRecipe') {
      setfullRecipe(e.target.value)
    } else if (e.target.name == 'imgurl') {
      setImgurl(e.target.value)
    }
  }

  const onSubmit = async (e) =>{
    e.preventDefault();
    
    const result = await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({ title, description, imgurl, fullRecipe, userName }),
    });
    const data = await result.json();

    setTitle("");
    setDescription("");
    setfullRecipe("");
    setImgurl("");

    toast.success('Your Recipe added!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
  }

  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p className="w-full text-center flex justify-center mt-12"><LoadingIcons.SpinningCircles className="" fill="#ca8a04" /></p>;

  return (
    <form className="max-w-3xl mx-auto my-16 p-8 bg-white shadow-lg rounded-lg space-y-8">
  <ToastContainer />
  <div className="text-center">
    <h2 className="text-2xl font-semibold text-gray-800">Add a New Recipe</h2>
    <p className="text-gray-500 mt-2">This information will be displayed publicly, so be careful what you share.</p>
  </div>

  {/* Recipe Title */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Recipe Title</label>
    <input
      value={title}
      onChange={handleChange}
      name="title"
      type="text"
      placeholder="Enter recipe title"
      className="mt-2 w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  {/* Image URL */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Image URL</label>
    <input
      value={imgurl}
      onChange={handleChange}
      name="imgurl"
      type="text"
      placeholder="Enter image URL"
      className="mt-2 w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  {/* Short Description */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Short Description</label>
    <textarea
      value={description}
      onChange={handleChange}
      name="description"
      placeholder="Enter a short description of the recipe"
      rows="3"
      className="mt-2 w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    ></textarea>
  </div>

  {/* Full Recipe */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Full Recipe</label>
    <textarea
      value={fullRecipe}
      onChange={handleChange}
      name="fullRecipe"
      placeholder="Enter the full recipe details"
      rows="5"
      className="mt-2 w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    ></textarea>
  </div>

  {/* Submit Button */}
  <div className="flex justify-center mt-8">
    <button
      onClick={onSubmit}
      className="bg-yellow-700 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      Submit Recipe
    </button>
  </div>
</form>

  )
}

export default Addrecipe
