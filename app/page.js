import React from 'react'
import Image from "next/image";
import Recipelist from './components/recipelist';

const Home = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto" >
        <div className="flex flex-col text-center w-full mb-20" >
          <h1 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">Welcome to the</h1>
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Recipe Book</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Discover, create, and share your culinary masterpieces with the RecipeBook app! Whether you're a seasoned chef or just starting, our app allows you to browse a diverse collection of recipes, save your favorites, and easily add your own creations. With user-friendly features like ingredient lists, step-by-step instructions, and customizable meal plans, you'll have everything you need to elevate your cooking experience. Join our community of food lovers and make every meal a delicious adventure!</p>
        </div>

        <div className="flex flex-wrap" >
          <Recipelist />
        </div>

        <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
      </div>
    </section>
  )
}

export default Home