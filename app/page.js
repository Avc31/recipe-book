import React from 'react';
import Featuredrecipes from './components/Featuredrecipes';

const Home = () => {
  return (
    <section className="bg-white text-gray-800 py-20 bg-yellow-50">
      <div className="container mx-auto px-5">
        
        <div className="text-center w-full mb-16">
          <h1 className="text-sm uppercase text-yellow-800 tracking-wider font-semibold mb-2">Welcome to the</h1>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">RecipeBook</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-700">
            Discover, create, and share your culinary masterpieces! Whether you’re a seasoned chef or a beginner, explore our diverse collection of recipes, save your favorites, and share your own creations with the RecipeBook app.
          </p>
        </div>
        
        
        <div className="flex flex-col items-center mb-12">
          <h3 className="text-xl font-bold text-center text-gray-800 mb-8">Today&apos;s Pick</h3>
          <div className="flex flex-wrap justify-center gap-6">
            <Featuredrecipes />
          </div>
        </div>
        
      </div>
    </section>
  );
}

export default Home;
