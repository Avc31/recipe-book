import React from 'react'
import Image from "next/image";

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
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60" >
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Biryani</h2>
        <p className="leading-relaxed text-base mb-4">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        <a className="text-indigo-500 inline-flex items-center">Learn More
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60" >
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Chicken tikka</h2>
        <p className="leading-relaxed text-base mb-4">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        <a className="text-indigo-500 inline-flex items-center">Learn More
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60" >
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Mutton korma</h2>
        <p className="leading-relaxed text-base mb-4">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        <a className="text-indigo-500 inline-flex items-center">Learn More
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60" >
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Gulab jamun</h2>
        <p className="leading-relaxed text-base mb-4">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        <a className="text-indigo-500 inline-flex items-center">Learn More
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
    <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
  </div>
</section>
  )
}

export default Home