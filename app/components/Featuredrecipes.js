"use client"; 

import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingIcons from "react-loading-icons";

const Featuredrecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);
    const [todaysRecipes, setTodaysRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch("/api/recipes");
                if (!response.ok) {
                    throw new Error("Failed to fetch recipes");
                }
                const data = await response.json();
                setRecipes(data.recipes);

                // Randomly select two recipes for the day
                selectTodaysRecipes(data.recipes);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching recipes:", err);
            } finally {
                setLoading(false); 
            }
        };

        const selectTodaysRecipes = (recipes) => {
            const today = new Date().toDateString();
            const storedDate = localStorage.getItem("today");
            const storedRecipes = localStorage.getItem("todaysRecipes");

            if (storedDate === today && storedRecipes) {
                // Use cached recipes for today if available
                setTodaysRecipes(JSON.parse(storedRecipes));
            } else {
                // Select two random recipes and cache them
                const shuffledRecipes = recipes.sort(() => 0.5 - Math.random());
                const selectedRecipes = shuffledRecipes.slice(0, 3);
                setTodaysRecipes(selectedRecipes);
                localStorage.setItem("today", today);
                localStorage.setItem("todaysRecipes", JSON.stringify(selectedRecipes));
            }
        };

        fetchRecipes();
    }, []);

    if (loading) return <p><LoadingIcons.SpinningCircles className="" fill="#ca8a04" /></p>;


    return (
        <>
            {error && <p>Error: {error}</p>}


            {todaysRecipes.map((recipe) => (
                <div key={recipe._id} className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                    <img src={recipe.imgurl || "https://placehold.co/600x400/EEE/31343C"} alt={recipe.title} className="w-full h-48 object-cover rounded-lg mb-4"  onError={(e) => { e.target.src = "https://placehold.co/600x400/EEE/31343C"; }} />
                    <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">{recipe.title}</h2>
                    <p className="leading-relaxed text-base mb-4">{recipe.description}</p>
                    <p className="text-gray-600 text-sm mb-4">Uploaded by: <span className="font-medium text-gray-700">{recipe.userName}</span></p>
                    <Link href={`/recipes/${recipe._id}`} className="text-yellow-600 inline-flex items-center">
                        View Recipe
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </Link>
                </div>
            ))}
        </>
    );
};

export default Featuredrecipes;
