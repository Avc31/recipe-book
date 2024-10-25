"use client";

import React from 'react'
import { useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addrecipe = () => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [fullRecipe, setfullRecipe] = useState("")
  const [imgurl, setImgurl] = useState("")

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
    console.log(title, description, fullRecipe, imgurl)

    const result = await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure data is sent as JSON
      },
      body: JSON.stringify({ title, description, imgurl, fullRecipe }),
    });

    const data = await result.json();
    console.log("API response:", data);

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

  return (
    <form className='m-20'>
      <ToastContainer />
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-6">
        
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label  className="block text-sm font-medium leading-6 text-gray-900">
                Recipe title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    value={title}
                    onChange={handleChange}
                    id=""
                    name="title"
                    type="text"
                    placeholder="title here"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label  className="block text-sm font-medium leading-6 text-gray-900">
                Image URL
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    value={imgurl}
                    onChange={handleChange}
                    id=""
                    name="imgurl"
                    type="text"
                    placeholder="title here"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>


            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Short description
              </label>
              <div className="mt-2">
                <textarea
                  onChange={handleChange}
                  id=""
                  name="description"
                  placeholder="short description here"
                  value={description}
                  rows={3}
                  className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-3"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Full Recipe
              </label>
              <div className="mt-2">
                <textarea
                  onChange={handleChange}
                  id=""
                  name="fullRecipe"
                  placeholder="full recipe here"
                  value={fullRecipe}
                  rows={3}
                  className="pl-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-3 flex items-center justify-center gap-x-2">
        <button
          onClick={onSubmit}
          // type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default Addrecipe
