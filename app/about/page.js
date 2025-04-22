import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 ">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-yellow-800">
          About RecipeBook
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to RecipeBook, your go-to platform for discovering, sharing, and creating delicious recipes. Our mission is to inspire home cooks and food enthusiasts to explore their culinary creativity.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Whether you&apos;re looking for quick weeknight dinners, indulgent desserts, or healthy meal prep ideas, we have something for everyone. Our collection of recipes is curated from talented chefs and home cooks from around the world, ensuring that you&apos;ll find a variety of flavors and cuisines to satisfy your cravings.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Join our community, share your favorite recipes, and connect with fellow food lovers. Let&apos;s embark on this culinary journey together!
        </p>
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800">Happy Cooking!</h2>
        </div>
      </div>
    </div>
  );
}

